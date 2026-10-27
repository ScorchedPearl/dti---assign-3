import {
  Accessibility, AlarmClock, Armchair, ArrowUpFromLine, Award, Banknote, BedDouble, Bell, BookOpen, Bot, Building2,
  CalendarCheck, Cctv, Circle, CircleCheck, CircleHelp, Clapperboard, ClipboardCheck, CloudUpload, Compass, CreditCard,
  CupSoda, DoorOpen, Eraser, FileCheck2, FileText, FolderKanban, FolderOpen, Gamepad2, GraduationCap, Hand, Handshake,
  Headphones, House, IdCard, Image, Languages, Laptop, Laugh, Lightbulb, Link2, Map, Medal, Meh, MessageCircle,
  MonitorPlay, Plane, Puzzle, Repeat, Ruler, Save, School, Shield, ShieldCheck, ShoppingBasket, Signpost, Siren,
  Smartphone, Smile, Frown, Star, Sun, Thermometer, Ticket, Timer, TrafficCone, TrainFront, User, Users, Vibrate,
  Volume2, WifiOff, Zap, type LucideIcon, type LucideProps,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  "🚆": TrainFront, "📁": FolderOpen, "👨‍👩‍👧": Users, "🏫": School, "🏠": House, "💻": Laptop, "🚪": DoorOpen,
  "🧾": FileCheck2, "🛏️": BedDouble, "🛏": BedDouble, "🤝": Handshake, "🧑‍🎓": GraduationCap, "💂": Shield, "💬": MessageCircle,
  "🧍": User, "📺": MonitorPlay, "📄": FileText, "🏢": Building2, "🧑‍🤝‍🧑": Users, "🗂️": FolderKanban, "📶": WifiOff,
  "🧭": Compass, "📋": ClipboardCheck, "☁️": CloudUpload, "✅": CircleCheck, "✔️": CircleCheck, "🔗": Link2,
  "🛡️": ShieldCheck, "♿": Accessibility, "🎧": Headphones, "🎮": Gamepad2, "🪑": Armchair, "🎫": Ticket, "⏱": Timer,
  "🔔": Bell, "📳": Vibrate, "🎖️": Award, "⚡": Zap, "🔆": Sun, "🧹": Eraser, "🔄": Repeat, "❓": CircleHelp,
  "🧩": Puzzle, "✈️": Plane, "🆘": Siren, "📹": Cctv, "💡": Lightbulb, "🪪": IdCard, "🛗": ArrowUpFromLine,
  "🔊": Volume2, "🗣️": Languages, "👥": Users, "🌡️": Thermometer, "📚": BookOpen, "💳": CreditCard, "🏅": Medal,
  "⭐": Star, "🗓️": CalendarCheck, "🖼️": Image, "💾": Save, "📏": Ruler, "🔁": Repeat, "🚦": TrafficCone,
  "💸": Banknote, "🗺️": Map, "⏰": AlarmClock, "🪧": Signpost, "🥤": CupSoda, "🎬": Clapperboard, "🤖": Bot,
  "🙋": Hand, "📱": Smartphone, "🧺": ShoppingBasket,
};

/** Line icon for a legacy emoji key, so content data can stay unchanged. */
export function Ico({ e, size = 20, strokeWidth = 1.75, ...rest }: { e: string } & LucideProps) {
  const I = MAP[e] ?? MAP[e.replace(/️/g, "")] ?? Circle;
  return <I size={size} strokeWidth={strokeWidth} {...rest} />;
}

const FACE: Record<string, [LucideIcon, string]> = {
  "2": [Laugh, "#2f8f4e"],
  "1.5": [Laugh, "#2f8f4e"],
  "1": [Smile, "#1f8f84"],
  "0": [Meh, "#c98a00"],
  "-1": [Frown, "#d0753a"],
  "-2": [Frown, "#c4453a"],
};

/** Emotion icon for a valence from -2 (bad) to 2 (good). */
export function Face({ v, size = 22, color, ...rest }: { v: number } & LucideProps) {
  const [I, c] = FACE[String(v)] ?? FACE["0"];
  return <I size={size} strokeWidth={2} color={color ?? c} {...rest} />;
}

export const faceColor = (v: number) => (FACE[String(v)] ?? FACE["0"])[1];
