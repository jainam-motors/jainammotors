import { LegalPage } from "../components/LegalPage";

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This Privacy Policy explains how Jainam Motors collects, uses and protects personal information when you visit our website or submit an enquiry for our vehicles, services or dealership support."
      sections={[
        {
          title: "Information We Collect",
          paragraphs: [
            "We may collect your name, mobile number, email address, message content and any other details you share through our enquiry form or by contacting us directly.",
            "We may also collect limited technical information such as browser type, device information and basic usage data to help us maintain and improve the website.",
          ],
        },
        {
          title: "Purpose of Collection",
          paragraphs: [
            "We collect information to respond to enquiries, share vehicle details, provide support, coordinate test drives, explain financing options and communicate dealership updates where permitted.",
          ],
        },
        {
          title: "Contact Form Data",
          paragraphs: [
            "Details submitted through our contact form are used solely for business communication related to Jainam Motors. We do not intentionally collect sensitive personal data through the form.",
          ],
        },
        {
          title: "How We Use Your Data",
          paragraphs: [
            "We use the information you provide to contact you, process your request, maintain records of customer interactions, improve our services and support legitimate dealership operations.",
          ],
        },
        {
          title: "Data Security",
          paragraphs: [
            "We take reasonable administrative and technical measures to help protect your personal information from unauthorised access, disclosure or misuse. No method of transmission over the internet can be guaranteed to be fully secure.",
          ],
        },
        {
          title: "Third-Party Services",
          paragraphs: [
            "We use Web3Forms to process enquiry submissions without operating a custom backend. Web3Forms may receive the data you submit in order to deliver the message to our team. Please review their policies separately if you would like to understand how they handle data.",
          ],
        },
        {
          title: "Cookies",
          paragraphs: [
            "Our website may use essential cookies or similar technologies to support website functionality and basic analytics. You can control cookies through your browser settings, although some features may not function properly if cookies are disabled.",
          ],
        },
        {
          title: "Contact Information",
          paragraphs: [
            "If you have questions about this Privacy Policy or how your information is used, please contact Jainam Motors at jainammotors@gmail.com or call +91 95740 05036.",
          ],
        },
      ]}
    />
  );
}
