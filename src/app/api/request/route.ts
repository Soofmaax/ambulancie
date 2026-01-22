import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@data/site-config";
import { antiSpamConfig, verifyFormTimeToken } from "@/lib/anti-spam";
import { sendFormEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  // Honeypot simple : champ qui doit rester vide
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    return redirectWithMessage(req, "demande-transport", "error=spam");
  }

  const formTypeRaw = formData.get("formType");
  const formType =
    formTypeRaw === "contact" ? "contact" : "transport-request";

  const token = formData.get("formTimeToken");
  const minDelayMs =
    formType === "transport-request"
      ? antiSpamConfig.requestMinDelayMs
      : antiSpamConfig.contactMinDelayMs;

  const timestamp = verifyFormTimeToken(
    typeof token === "string" ? token : null,
    minDelayMs
  );

  if (!timestamp) {
    return redirectWithMessage(req, getOriginPath(formType), "error=timing");
  }

  const phone = String(formData.get("phone") || "").trim();
  if (!phone) {
    return redirectWithMessage(req, getOriginPath(formType), "error=phone");
  }

  const name = String(formData.get("name") || "").trim() || undefined;
  const email = String(formData.get("email") || "").trim() || undefined;
  const transportType =
    String(formData.get("transportType") || "").trim() || undefined;
  const date = String(formData.get("date") || "").trim() || undefined;
  const time = String(formData.get("time") || "").trim() || undefined;
  const from = String(formData.get("from") || "").trim() || undefined;
  const to = String(formData.get("to") || "").trim() || undefined;
  const position =
    String(formData.get("position") || "").trim() || undefined;
  const comment =
    String(formData.get("comment") || "").trim() || undefined;
  const consent = formData.get("consent") === "on";

  if (!consent) {
    return redirectWithMessage(req, getOriginPath(formType), "error=consent");
  }

  try {
    await sendFormEmail({
      formType,
      name,
      phone,
      email,
      transportType,
      date,
      time,
      from,
      to,
      position,
      comment,
      consent,
    });
  } catch (error) {
    console.error("[api/request] Erreur lors de l'envoi de l'e-mail", error);
    return redirectWithMessage(req, getOriginPath(formType), "error=server");
  }

  const successParam =
    formType === "transport-request"
      ? "success=request"
      : "success=contact";

  return redirectWithMessage(req, getOriginPath(formType), successParam);
}

function getOriginPath(formType: "transport-request" | "contact") {
  return formType === "transport-request"
    ? "/demande-transport"
    : "/contact";
}

function redirectWithMessage(
  req: NextRequest,
  toPath: string,
  query: string
) {
  const url = new URL(toPath, req.url);
  url.search = query;
  return NextResponse.redirect(url, { status: 303 });
}