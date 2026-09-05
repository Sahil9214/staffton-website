"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  Mail,
  Clock,
  ChevronDown,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { API_BASE_URL, API_ENDPOINTS } from "../../utility/constants";
import { CONTACT_EMAIL } from "../../utility/site";
import Reveal from "../../components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "../../components/motion/Stagger";

const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}`;

const CONTACT_SIDE_IMAGE = {
  src: "/images/streamlined_platform_integration.webp",
  alt: "Healthcare professional in blue scrubs reviewing clinical data on a tablet",
};

const inputBase =
  "h-11 w-full rounded-[10px] border bg-surface-offwhite px-3 font-inter text-sm leading-[17px] text-heading placeholder:text-muted-light transition-all focus:outline-none focus:ring-2";
const inputOk =
  "border-border-light focus:border-accent focus:ring-accent/20";
const inputErr =
  "border-red-500 focus:border-red-500 focus:ring-red-200";
const labelClass =
  "font-inter text-sm font-semibold leading-[17px] text-heading";
const fieldErrorClass =
  "animate-in slide-in-from-top-1 text-xs font-medium text-red-500 duration-150";
const fieldGroupClass = "flex min-w-0 flex-1 flex-col gap-1.5";
const overlayCardClass =
  "flex w-full flex-row items-center gap-4 rounded-2xl border border-border-light bg-white p-5 shadow-[0px_10px_24px_-10px_rgba(0,0,0,0.05)] sm:p-6";
const overlayIconClass =
  "flex h-10 w-10 shrink-0 select-none items-center justify-center rounded-[10px] bg-badge-soft";
const overlayLabelClass =
  "font-inter text-xs font-bold uppercase leading-[15px] tracking-[0.5px] text-neutral";
const overlayValueClass =
  "font-inter text-sm font-semibold leading-[18px] text-heading break-all";

interface FormFields {
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  subject: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  role?: string;
  subject?: string;
  message?: string;
}

const DEFAULT_FIELDS: FormFields = {
  fullName: "",
  email: "",
  phoneNumber: "",
  role: "Medical Professional",
  subject: "",
  message: "",
};

const FULL_NAME_MAX_LENGTH = 80;
const FULL_NAME_REGEX = /^[A-Za-z]+(?:[ '-][A-Za-z]+)+$/;
const EMAIL_MAX_LENGTH = 254;
const EMAIL_REGEX =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;
const SUBJECT_MIN_LENGTH = 3;
const SUBJECT_MAX_LENGTH = 100;
const PHONE_MAX_DIGITS = 10;
const MESSAGE_MAX_LENGTH = 1000;

const ContactGridSection = () => {
  const [fields, setFields] = useState<FormFields>(DEFAULT_FIELDS);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const validateField = (name: keyof FormFields, value: string): string => {
    switch (name) {
      case "fullName":
        if (!value.trim()) return "Full name is required.";
        if (value.trim().length > FULL_NAME_MAX_LENGTH)
          return `Name must be ${FULL_NAME_MAX_LENGTH} characters or fewer.`;
        if (!FULL_NAME_REGEX.test(value.trim()))
          return "Enter first and last name using letters only.";
        return "";
      case "email": {
        const email = value.trim();
        if (!email) return "Email address is required.";
        if (email.length > EMAIL_MAX_LENGTH)
          return `Email must be ${EMAIL_MAX_LENGTH} characters or fewer.`;
        if (email.includes("..") || !EMAIL_REGEX.test(email))
          return "Please enter a valid email address.";
        return "";
      }
      case "phoneNumber": {
        if (!value.trim()) return "Phone number is required.";
        const cleanPhone = value.replace(/\D/g, "");
        if (cleanPhone.length < 10)
          return "Phone number must have at least 10 digits.";
        return "";
      }
      case "role":
        if (!value) return "Please select your role.";
        return "";
      case "subject":
        if (!value.trim()) return "Subject is required.";
        if (value.trim().length < SUBJECT_MIN_LENGTH)
          return `Subject must be at least ${SUBJECT_MIN_LENGTH} characters.`;
        if (value.length > SUBJECT_MAX_LENGTH)
          return `Subject must be ${SUBJECT_MAX_LENGTH} characters or fewer.`;
        return "";
      case "message":
        if (!value.trim()) return "Message is required.";
        if (value.trim().length < 10)
          return "Message must be at least 10 characters.";
        if (value.length > MESSAGE_MAX_LENGTH)
          return `Message must be ${MESSAGE_MAX_LENGTH} characters or fewer.`;
        return "";
      default:
        return "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    let formattedValue = value;
    if (name === "phoneNumber") {
      formattedValue = value.replace(/\D/g, "").slice(0, PHONE_MAX_DIGITS);
    } else if (name === "fullName") {
      formattedValue = value.slice(0, FULL_NAME_MAX_LENGTH);
    } else if (name === "email") {
      formattedValue = value.slice(0, EMAIL_MAX_LENGTH);
    } else if (name === "subject") {
      formattedValue = value.slice(0, SUBJECT_MAX_LENGTH);
    } else if (name === "message") {
      formattedValue = value.slice(0, MESSAGE_MAX_LENGTH);
    }

    setFields((prev) => ({ ...prev, [name]: formattedValue }));

    if (errors[name as keyof FormFields]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const fieldError = validateField(name as keyof FormFields, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    Object.keys(fields).forEach((key) => {
      const err = validateField(
        key as keyof FormFields,
        fields[key as keyof FormFields]
      );
      if (err) {
        newErrors[key as keyof FormErrors] = err;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorKey = Object.keys(newErrors)[0];
      const element = document.getElementsByName(firstErrorKey)[0];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        (element as HTMLElement).focus();
      }
      return;
    }

    setSubmitStatus("submitting");

    try {
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.COMMON.CONTACT_US}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
          full_name: fields.fullName,
          email: fields.email,
          phone_number: fields.phoneNumber,
          user_type: fields.role,
          subject: fields.subject,
          message: fields.message,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setSubmitStatus("success");
      setFields(DEFAULT_FIELDS);
      setErrors({});
    } catch {
      setSubmitStatus("error");
    }
  };

  return (
    <section className="w-full bg-white">
      <div className="section-container flex flex-col items-stretch gap-8 lg:flex-row lg:items-start lg:gap-12">
        {/* Left — Form Card */}
        <Reveal className="w-full min-w-0 flex-1">
          <div className="flex w-full flex-col gap-6 rounded-2xl border border-border-light bg-white p-6 shadow-[0px_10px_24px_-10px_rgba(0,0,0,0.05)] sm:p-8">
            {submitStatus === "error" && (
              <div className="animate-in fade-in flex items-start gap-3 rounded-[10px] border border-red-200 bg-red-50 p-4 duration-200">
                <span className="mt-0.5 text-lg font-bold leading-none text-red-500">
                  !
                </span>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold text-red-700">
                    Something went wrong
                  </p>
                  <p className="text-xs text-red-600">
                    We couldn&apos;t send your message. Please try again or
                    email us directly at {CONTACT_EMAIL}
                  </p>
                </div>
              </div>
            )}

            {submitStatus === "success" ? (
              <div className="animate-in fade-in flex flex-col items-center justify-center px-4 py-16 text-center duration-300">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-badge-soft text-accent">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="mb-3 font-inter text-2xl font-bold text-heading">
                  Message Sent Successfully!
                </h3>
                <p className="mb-8 max-w-md font-inter text-sm font-normal leading-relaxed text-neutral">
                  Thank you for reaching out to Staffton. Our support team
                  typically reviews inquiries and responds within 2 business
                  hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitStatus("idle")}
                  className="rounded-[10px] bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0px_10px_24px_-10px_rgba(13,148,136,0.2)] transition-colors hover:bg-brand-hover active:bg-brand-dark"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-2">
                  <h2 className="font-inter text-2xl font-bold leading-[29px] text-heading">
                    Send us a Message
                  </h2>
                  <p className="font-inter text-sm font-normal leading-[17px] text-neutral">
                    Our team typically responds within 2 business hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Name + Email */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
                    <div className={fieldGroupClass}>
                      <label htmlFor="fullName" className={labelClass}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={fields.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Jane Doe"
                        maxLength={FULL_NAME_MAX_LENGTH}
                        autoComplete="name"
                        className={`${inputBase} ${errors.fullName ? inputErr : inputOk}`}
                      />
                      {errors.fullName && (
                        <span className={fieldErrorClass}>
                          {errors.fullName}
                        </span>
                      )}
                    </div>

                    <div className={fieldGroupClass}>
                      <label htmlFor="email" className={labelClass}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={fields.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="jane.doe@hospital.org"
                        maxLength={EMAIL_MAX_LENGTH}
                        autoComplete="email"
                        className={`${inputBase} ${errors.email ? inputErr : inputOk}`}
                      />
                      {errors.email && (
                        <span className={fieldErrorClass}>{errors.email}</span>
                      )}
                    </div>
                  </div>

                  {/* Phone + Role */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
                    <div className={fieldGroupClass}>
                      <label htmlFor="phoneNumber" className={labelClass}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={fields.phoneNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="5550000000"
                        maxLength={PHONE_MAX_DIGITS}
                        inputMode="numeric"
                        autoComplete="tel"
                        className={`${inputBase} ${errors.phoneNumber ? inputErr : inputOk}`}
                      />
                      {errors.phoneNumber && (
                        <span className={fieldErrorClass}>
                          {errors.phoneNumber}
                        </span>
                      )}
                    </div>

                    <div className={fieldGroupClass}>
                      <label htmlFor="role" className={labelClass}>
                        I am a...
                      </label>
                      <div className="relative w-full">
                        <select
                          id="role"
                          name="role"
                          value={fields.role}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`${inputBase} cursor-pointer appearance-none pr-10 text-neutral ${
                            errors.role ? inputErr : inputOk
                          }`}
                        >
                          <option value="Medical Professional">
                            Medical Professional
                          </option>
                          <option value="Doctor">Doctor</option>
                          <option value="Nurse">Nurse</option>
                          <option value="Allied Health Worker">
                            Allied Health Worker
                          </option>
                          <option value="Technician">Technician</option>
                          <option value="Non-Clinical Staff">
                            Non-Clinical Staff
                          </option>
                          <option value="Hospital / Facility">
                            Hospital / Facility
                          </option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <ChevronDown className="h-4 w-4 text-neutral" />
                        </div>
                      </div>
                      {errors.role && (
                        <span className={fieldErrorClass}>{errors.role}</span>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="subject" className={labelClass}>
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={fields.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Inquiry about credentialing / facility onboarding"
                      maxLength={SUBJECT_MAX_LENGTH}
                      className={`${inputBase} ${errors.subject ? inputErr : inputOk}`}
                    />
                    {errors.subject && (
                      <span className={fieldErrorClass}>{errors.subject}</span>
                    )}
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className={labelClass}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={fields.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Type your message here..."
                      maxLength={MESSAGE_MAX_LENGTH}
                      aria-describedby="message-count"
                      className={`${inputBase} h-[120px] resize-none py-3 ${
                        errors.message ? inputErr : inputOk
                      }`}
                    />
                    <div className="flex items-start justify-between gap-3">
                      {errors.message && (
                        <span className={fieldErrorClass}>{errors.message}</span>
                      )}
                      <span
                        id="message-count"
                        className={`ml-auto shrink-0 text-xs tabular-nums ${
                          fields.message.length >= MESSAGE_MAX_LENGTH
                            ? "font-medium text-red-500"
                            : "text-neutral"
                        }`}
                      >
                        {fields.message.length}/{MESSAGE_MAX_LENGTH}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitStatus === "submitting"}
                    className="mt-0 flex h-[43px] w-full cursor-pointer select-none items-center justify-center gap-2.5 rounded-[10px] bg-accent px-6 py-3 font-inter font-semibold text-white shadow-[0px_10px_24px_-10px_rgba(13,148,136,0.2)] transition-colors hover:bg-brand-hover active:bg-brand-dark disabled:bg-teal-400"
                  >
                    {submitStatus === "submitting" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-white" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-base leading-[19px]">
                          Send Message
                        </span>
                        <ArrowRight className="h-4 w-4 text-white" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </Reveal>

        {/* Right — Photo + overlay contact cards */}
        <Reveal
          delay={0.1}
          className="relative w-full min-w-0 overflow-hidden rounded-[23px] lg:w-[456px] lg:max-w-[456px] lg:shrink-0 lg:self-stretch"
        >
          <div className="relative h-[520px] w-full sm:h-[580px] lg:absolute lg:inset-0 lg:h-auto">
            <Image
              src={CONTACT_SIDE_IMAGE.src}
              alt={CONTACT_SIDE_IMAGE.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 456px"
              className="object-cover object-[center_18%]"
              priority
            />

            {/* Soft gradient so white cards stay readable */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-black/5 to-transparent"
            />

            <StaggerContainer className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end gap-4 p-5 sm:p-8 lg:p-14">
              <StaggerItem className="w-full max-w-[344px]">
                <a
                  href="tel:9111101377"
                  className={`${overlayCardClass} group transition-colors hover:border-accent`}
                >
                  <div className={overlayIconClass}>
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className={overlayLabelClass}>Phone Line</span>
                    <p
                      className={`${overlayValueClass} transition-colors group-hover:text-accent`}
                    >
                      9111101377
                    </p>
                  </div>
                </a>
              </StaggerItem>

              <StaggerItem className="w-full max-w-[344px]">
                <a
                  href={GMAIL_COMPOSE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${overlayCardClass} group transition-colors hover:border-accent`}
                >
                  <div className={overlayIconClass}>
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className={overlayLabelClass}>Email Support</span>
                    <p
                      className={`${overlayValueClass} transition-colors group-hover:text-accent`}
                    >
                      {CONTACT_EMAIL}
                    </p>
                  </div>
                </a>
              </StaggerItem>

              <StaggerItem className="w-full max-w-[344px]">
                <div className={overlayCardClass}>
                  <div className={overlayIconClass}>
                    <Clock className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className={overlayLabelClass}>Business Hours</span>
                    <p className={overlayValueClass}>24 hrs</p>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactGridSection;
