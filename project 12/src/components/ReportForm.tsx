import { useState, FormEvent, useEffect } from 'react';
import { CheckCircle, ShieldAlert, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import emailjs from '@emailjs/browser';

type Step = 'description' | 'choice' | 'details' | 'submitted';

type FormData = {
  anonymous: boolean | null;
  name: string;
  email: string;
  description: string;
  consent: boolean;
};

type FormErrors = {
  name?: string;
  email?: string;
  description?: string;
  consent?: string;
};

export default function ReportForm() {
  const { t, language } = useLanguage();
  const [step, setStep] = useState<Step>('description');
  const [showWarning, setShowWarning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    anonymous: null,
    name: '',
    email: '',
    description: '',
    consent: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());

  // Initialize EmailJS
  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, []);

  const validateField = (name: string, value: string | boolean): string | undefined => {
    if (name === 'name' && formData.anonymous === false) {
      if (!value) return t.reportForm.detailsStep.errorNameRequired;
    }
    if (name === 'email' && formData.anonymous === false) {
      if (!value) return t.reportForm.detailsStep.errorEmailRequired;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string)) {
        return t.reportForm.detailsStep.errorEmailInvalid;
      }
    }
    if (name === 'description') {
      if (!value) return t.reportForm.descriptionStep.errorRequired;
      if ((value as string).length < 20) {
        return t.reportForm.descriptionStep.errorMinLength;
      }
    }
    if (name === 'consent' && formData.anonymous === false) {
      if (!value) return t.reportForm.detailsStep.errorConsentRequired;
    }
    return undefined;
  };

  const validateDetails = (): boolean => {
    const newErrors: FormErrors = {};

    if (formData.anonymous === false) {
      const nameError = validateField('name', formData.name);
      const emailError = validateField('email', formData.email);
      const consentError = validateField('consent', formData.consent);
      if (nameError) newErrors.name = nameError;
      if (emailError) newErrors.email = emailError;
      if (consentError) newErrors.consent = consentError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmail = async (): Promise<boolean> => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

      console.log('Sending email with:', { serviceId, templateId });

      const templateParams = {
        report_type: formData.anonymous 
          ? (language === 'hr' ? 'Anonimna prijava' : 'Anonymous Report')
          : (language === 'hr' ? 'Prijava s kontaktom' : 'Report with Contact'),
        from_name: formData.anonymous ? (language === 'hr' ? 'Anonimno' : 'Anonymous') : formData.name,
        reply_to: formData.anonymous ? 'noreply@scan4support.com' : formData.email,
        message: formData.description,
        sent_date: new Date().toLocaleString(language === 'hr' ? 'hr-HR' : 'en-US'),
      };

      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams
      );

      console.log('EmailJS Response:', response);
      return true;
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitError(
        language === 'hr' 
          ? 'Greška pri slanju. Molimo pokušajte ponovno.' 
          : 'Error sending. Please try again.'
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => new Set(prev).add(field));
    const value = formData[field as keyof FormData];
    if (value !== null) {
      const error = validateField(field, value);
      setErrors(prev => ({
        ...prev,
        [field]: error,
      }));
    }
  };

  const handleDescriptionSubmit = (e: FormEvent) => {
    e.preventDefault();
    const error = validateField('description', formData.description);
    if (!error) {
      setStep('choice');
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    } else {
      setTouched(prev => new Set(prev).add('description'));
      setErrors(prev => ({ ...prev, description: error }));
    }
  };

  const handleAnonymousChoice = (isAnonymous: boolean) => {
    if (isAnonymous) {
      setShowWarning(true);
    } else {
      setFormData(prev => ({ ...prev, anonymous: false }));
      setStep('details');
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    }
  };

  const handleConfirmAnonymous = async () => {
    setFormData(prev => ({ ...prev, anonymous: true }));
    setShowWarning(false);
    
    const success = await sendEmail();
    if (success) {
      setStep('submitted');
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    }
  };

  const handleDetailsSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateDetails()) {
      const success = await sendEmail();
      if (success) {
        setStep('submitted');
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      anonymous: null,
      name: '',
      email: '',
      description: '',
      consent: false,
    });
    setErrors({});
    setTouched(new Set());
    setStep('description');
    setShowWarning(false);
    setSubmitError(null);
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (step === 'submitted') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [step]);

  if (step === 'submitted') {
    return (
      <div className="max-w-2xl mx-auto px-4">
        <div className="glass-card rounded-2xl p-5 sm:p-6 md:p-8 text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[var(--accent)]/10 mb-4 sm:mb-6 animate-success-scale">
            <CheckCircle className="w-12 h-12 sm:w-14 sm:h-14 text-[var(--accent)] animate-check-draw" aria-hidden="true" />
          </div>
          <h2 className="text-[19px] sm:text-2xl font-semibold text-[var(--ink)] mb-2 sm:mb-3 leading-tight">
            {t.reportForm.successStep.title}
          </h2>
          <p className="text-[var(--muted)] mb-5 sm:mb-6 text-[13px] sm:text-base leading-relaxed">
            {formData.anonymous === false
              ? t.reportForm.successStep.messageWithContact
              : t.reportForm.successStep.messageAnonymous}
          </p>
          <button
            onClick={resetForm}
            className="text-[var(--accent)] hover:underline font-medium transition-all text-[14px] sm:text-base"
          >
            {t.reportForm.successStep.newReportButton}
          </button>
        </div>
      </div>
    );
  }

  if (step === 'description') {
    return (
      <div className="max-w-2xl mx-auto px-4">
        <div className="glass-card rounded-2xl p-5 sm:p-6 md:p-8 animate-fade-in">
          <h2 className="text-[20px] sm:text-2xl md:text-3xl font-semibold text-[var(--ink)] mb-6 sm:mb-8 text-center leading-tight">
            {t.reportForm.title}
          </h2>

          <form onSubmit={handleDescriptionSubmit} className="space-y-5 sm:space-y-6">
            <div>
              <label htmlFor="description" className="block text-[13px] sm:text-sm font-medium text-[var(--ink)] mb-2">
                {t.reportForm.descriptionStep.descriptionLabel}
              </label>
              <textarea
                id="description"
                rows={5}
                minLength={20}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                onBlur={() => handleBlur('description')}
                aria-invalid={touched.has('description') && !!errors.description}
                aria-describedby={errors.description ? 'description-error' : undefined}
                placeholder={t.reportForm.descriptionStep.descriptionPlaceholder}
                className="input-field resize-none text-[14px] sm:text-base"
                autoFocus
              />
              <div className="flex justify-between items-start mt-1">
                <div className="flex-1">
                  {touched.has('description') && errors.description && (
                    <p id="description-error" role="alert" className="text-[11px] sm:text-sm text-red-500">
                      {errors.description}
                    </p>
                  )}
                </div>
                <p className="text-[11px] text-[var(--muted)] ml-2">
                  {formData.description.length}/20
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={formData.description.length < 20}
              className="btn-primary w-full"
            >
              {t.reportForm.descriptionStep.continueButton}
            </button>

            <div className="text-center">
              <a
                href="/politika-privatnosti"
                className="text-[11px] sm:text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              >
                {t.reportForm.descriptionStep.privacyPolicy}
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (step === 'choice') {
    return (
      <div className="max-w-2xl mx-auto px-4">
        <div className="glass-card rounded-2xl p-5 sm:p-6 md:p-8 animate-fade-in">
          <h2 className="text-[20px] sm:text-2xl md:text-3xl font-semibold text-[var(--ink)] mb-3 sm:mb-4 text-center leading-tight">
            {t.reportForm.choiceStep.title}
          </h2>
          <p className="text-[var(--muted)] text-center mb-6 sm:mb-8 text-[13px] sm:text-base leading-relaxed">
            {t.reportForm.choiceStep.subtitle}
          </p>

          <div className="space-y-3 sm:space-y-4">
            <button
              onClick={() => handleAnonymousChoice(true)}
              className="w-full p-4 sm:p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-[var(--accent)] hover:shadow-lg transition-all duration-300 text-left group"
            >
              <h3 className="font-semibold text-[15px] sm:text-lg text-[var(--ink)] mb-1 sm:mb-2 group-hover:text-[var(--accent)] transition-colors leading-tight">
                {t.reportForm.choiceStep.anonymousTitle}
              </h3>
              <p className="text-[12px] sm:text-sm text-[var(--muted)] leading-relaxed">
                {t.reportForm.choiceStep.anonymousDescription}
              </p>
            </button>

            <button
              onClick={() => handleAnonymousChoice(false)}
              className="w-full p-4 sm:p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-[var(--accent)] hover:shadow-lg transition-all duration-300 text-left group"
            >
              <h3 className="font-semibold text-[15px] sm:text-lg text-[var(--ink)] mb-1 sm:mb-2 group-hover:text-[var(--accent)] transition-colors leading-tight">
                {t.reportForm.choiceStep.contactTitle}
              </h3>
              <p className="text-[12px] sm:text-sm text-[var(--muted)] leading-relaxed">
                {t.reportForm.choiceStep.contactDescription}
              </p>
            </button>
          </div>

          <button
            onClick={() => setStep('description')}
            className="w-full mt-5 sm:mt-6 text-[var(--muted)] hover:text-[var(--accent)] transition-colors text-[13px] sm:text-sm"
          >
            {t.reportForm.choiceStep.backButton}
          </button>
        </div>

        {showWarning && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 max-w-md w-full animate-scale-in">
              <div className="flex flex-col items-center text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-amber-100 mb-3 sm:mb-4">
                  <ShieldAlert className="w-7 h-7 sm:w-8 sm:h-8 text-amber-600" />
                </div>
                <h3 className="text-[17px] sm:text-xl font-semibold text-[var(--ink)] mb-2 sm:mb-3 leading-tight">
                  {t.reportForm.warningModal.title}
                </h3>
                <p className="text-[var(--muted)] mb-5 sm:mb-6 text-[13px] sm:text-base leading-relaxed">
                  {t.reportForm.warningModal.message}
                </p>
                {submitError && (
                  <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm text-center">{submitError}</p>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
                  <button
                    onClick={() => {
                      setShowWarning(false);
                      handleAnonymousChoice(false);
                    }}
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-3 bg-[var(--accent)] text-white rounded-full hover:opacity-90 transition-all font-semibold text-[14px] sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {t.reportForm.warningModal.provideDataButton}
                  </button>
                  <button
                    onClick={handleConfirmAnonymous}
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-full hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all font-semibold text-[14px] sm:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    {t.reportForm.warningModal.stayAnonymousButton}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (step === 'details') {
    return (
      <div className="max-w-2xl mx-auto px-4">
        <div className="glass-card rounded-2xl p-5 sm:p-6 md:p-8 animate-fade-in">
          <h2 className="text-[20px] sm:text-2xl md:text-3xl font-semibold text-[var(--ink)] mb-5 sm:mb-8 text-center leading-tight">
            {t.reportForm.detailsStep.title}
          </h2>

          <form onSubmit={handleDetailsSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="name" className="block text-[13px] sm:text-sm font-medium text-[var(--ink)] mb-2">
                {t.reportForm.detailsStep.nameLabel}
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                onBlur={() => handleBlur('name')}
                aria-invalid={touched.has('name') && !!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className="input-field text-[14px] sm:text-base"
                autoFocus
              />
              {touched.has('name') && errors.name && (
                <p id="name-error" role="alert" className="mt-1 text-[11px] sm:text-sm text-red-500">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-[13px] sm:text-sm font-medium text-[var(--ink)] mb-2">
                {t.reportForm.detailsStep.emailLabel}
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                onBlur={() => handleBlur('email')}
                aria-invalid={touched.has('email') && !!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className="input-field text-[14px] sm:text-base"
              />
              {touched.has('email') && errors.email && (
                <p id="email-error" role="alert" className="mt-1 text-[11px] sm:text-sm text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => setFormData(prev => ({ ...prev, consent: e.target.checked }))}
                  onBlur={() => handleBlur('consent')}
                  aria-invalid={touched.has('consent') && !!errors.consent}
                  aria-describedby={errors.consent ? 'consent-error' : undefined}
                  className="mt-0.5 w-4 h-4 text-[var(--accent)] rounded focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
                />
                <span className="text-[12px] sm:text-sm text-[var(--ink)] leading-relaxed">
                  {t.reportForm.detailsStep.consentLabel}
                </span>
              </label>
              {touched.has('consent') && errors.consent && (
                <p id="consent-error" role="alert" className="mt-1 text-[11px] sm:text-sm text-red-500">
                  {errors.consent}
                </p>
              )}
            </div>

            {submitError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm text-center">{submitError}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={!formData.name || !formData.email || !formData.consent || isSubmitting}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
              {isSubmitting ? (language === 'hr' ? 'Šaljem...' : 'Sending...') : t.reportForm.detailsStep.submitButton}
            </button>

            <button
              type="button"
              onClick={() => setStep('choice')}
              className="w-full text-[var(--muted)] hover:text-[var(--accent)] transition-colors text-[13px] sm:text-sm"
            >
              {t.reportForm.detailsStep.backButton}
            </button>

            <div className="text-center">
              <a
                href="/politika-privatnosti"
                className="text-[11px] sm:text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              >
                {t.reportForm.detailsStep.privacyPolicy}
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return null;
}
