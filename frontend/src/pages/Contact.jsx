import { useState } from "react";
import ContactIcon from "../components/ContactIcon";
import { CONTACT_INFO } from "../data/contactInfo";
import { toast } from "react-hot-toast";
import "../styles/contact.css";
const API_URL = import.meta.env.VITE_API_URL;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      // Get response as text first
      const responseText = await response.text();

      let data = {};

      try {
        data = JSON.parse(responseText);
      } catch {
        data = {
          message: responseText,
        };
      }

      console.log("Status:", response.status);
      console.log("Backend Response:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to send message"
        );
      }

      // SUCCESS TOAST
      toast.success(
        data.message || "Message sent successfully!",
        {
          duration: 4000,
          position: "top-right",
        }
      );

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      toast.error(
        error.message ||
          "Unable to send your message. Please try again.",
        {
          duration: 4000,
          position: "top-right",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="contact-page">
      <section className="contact-section">
        <div className="contact-container">

          {/* ================= LEFT SIDE ================= */}
          <div className="contact-info">

            <p className="section-eyebrow">
              GET IN TOUCH
            </p>

            <h1 className="contact-title">
              Let's work
              <span> together.</span>
            </h1>

            <p className="contact-description">
              Have a project in mind, a question, or just want to say
              hello? Feel free to reach out. I'm always open to
              discussing new projects, creative ideas, and opportunities.
            </p>

            <div className="contact-details">

              {/* PHONE */}
              <div className="contact-item">

                <div className="contact-icon">
                  <ContactIcon type="phone" />
                </div>

                <div className="contact-item-content">

                  <span className="contact-label">
                    PHONE
                  </span>

                  {CONTACT_INFO.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="contact-value"
                    >
                      {phone}
                    </a>
                  ))}

                </div>

              </div>

              {/* EMAIL */}
              <div className="contact-item">

                <div className="contact-icon">
                  <ContactIcon type="mail" />
                </div>

                <div className="contact-item-content">

                  <span className="contact-label">
                    EMAIL
                  </span>

                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="contact-value"
                  >
                    {CONTACT_INFO.email}
                  </a>

                </div>

              </div>

              {/* LOCATION */}
              <div className="contact-item">

                <div className="contact-icon">
                  <ContactIcon type="location" />
                </div>

                <div className="contact-item-content">

                  <span className="contact-label">
                    LOCATION
                  </span>

                  <span className="contact-value">
                    {CONTACT_INFO.country}
                  </span>

                </div>

              </div>

            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="contact-form-wrapper">

            <div className="contact-form-header">

              <span className="form-number">
                01
              </span>

              <div>
                <h2>
                  Send a message
                </h2>

                <p>
                  Fill out the form and I'll get back to you soon.
                </p>
              </div>

            </div>

            {/* ================= FORM ================= */}
            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >

              {/* NAME + EMAIL */}
              <div className="form-row">

                <div className="form-group">

                  <label htmlFor="name">
                    NAME
                  </label>

                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />

                </div>

                <div className="form-group">

                  <label htmlFor="email">
                    EMAIL
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />

                </div>

              </div>

              {/* SUBJECT */}
              <div className="form-group">

                <label htmlFor="subject">
                  SUBJECT
                </label>

                <input
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="What is this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />

              </div>

              {/* MESSAGE */}
              <div className="form-group">

                <label htmlFor="message">
                  MESSAGE
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />

              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="contact-submit"
                disabled={loading}
              >
                <span>
                  {loading
                    ? "Sending..."
                    : "Send Message"}
                </span>

                {!loading && (
                  <ContactIcon type="arrow" />
                )}
              </button>

            </form>

          </div>

        </div>
      </section>
    </main>
  );
}