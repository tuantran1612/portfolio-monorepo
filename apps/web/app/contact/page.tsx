import ContactForm from "@/components/contacts/form";
import React from "react";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Tuan Tran for project inquiries or collaborations.",
};

export default async function ContactPage() {
  return <ContactForm />;
}
