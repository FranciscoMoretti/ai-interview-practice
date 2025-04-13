"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const LANGUAGES = [
  {
    code: "en",
    name: "English",
    firstSentence:
      "Hello! I'm your AI interview coach. I'll be conducting your {{topic}} interview today. What's your name?",
  },
  {
    code: "ar",
    name: "Arabic",
    firstSentence:
      "مرحباً! أنا مدرب المقابلات الذكي الخاص بك. سأقوم بإجراء مقابلة {{topic}} اليوم. ما اسمك؟",
  },
  {
    code: "bg",
    name: "Bulgarian",
    firstSentence:
      "Здравейте! Аз съм вашият AI интервю треньор. Ще проведа вашата {{topic}} интервю днес. Как се казвате?",
  },
  {
    code: "zh",
    name: "Chinese",
    firstSentence:
      "你好！我是你的AI面试教练。今天我将进行你的{{topic}}面试。你叫什么名字？",
  },
  {
    code: "hr",
    name: "Croatian",
    firstSentence:
      "Pozdrav! Ja sam vaš AI trener za intervjue. Danas ću voditi vaš {{topic}} intervju. Kako se zovete?",
  },
  {
    code: "cs",
    name: "Czech",
    firstSentence:
      "Ahoj! Jsem váš AI kouč pro pohovory. Dnes budu vést váš {{topic}} pohovor. Jak se jmenujete?",
  },
  {
    code: "da",
    name: "Danish",
    firstSentence:
      "Hej! Jeg er din AI-interviewtræner. Jeg vil føre dit {{topic}}-interview i dag. Hvad hedder du?",
  },
  {
    code: "nl",
    name: "Dutch",
    firstSentence:
      "Hallo! Ik ben je AI-interviewcoach. Ik ga vandaag je {{topic}}-interview afnemen. Wat is je naam?",
  },
  {
    code: "fi",
    name: "Finnish",
    firstSentence:
      "Hei! Olen sinun tekoälyhaastattelukouluttajasi. Käyn läpi {{topic}}-haastattelusi tänään. Mikä on nimesi?",
  },
  {
    code: "fr",
    name: "French",
    firstSentence:
      "Bonjour! Je suis votre coach d'entretien IA. Je vais mener votre entretien {{topic}} aujourd'hui. Quel est votre nom?",
  },
  {
    code: "de",
    name: "German",
    firstSentence:
      "Hallo! Ich bin Ihr KI-Interview-Coach. Ich werde heute Ihr {{topic}}-Interview führen. Wie heißen Sie?",
  },
  {
    code: "el",
    name: "Greek",
    firstSentence:
      "Γεια σας! Είμαι ο AI προπονητής συνεντεύξεων σας. Θα διεξάγω τη συνέντευξη {{topic}} σας σήμερα. Πώς σας λένε;",
  },
  {
    code: "hi",
    name: "Hindi",
    firstSentence:
      "नमस्ते! मैं आपका AI इंटरव्यू कोच हूं। आज मैं आपका {{topic}} इंटरव्यू आयोजित करूंगा। आपका नाम क्या है?",
  },
  {
    code: "hu",
    name: "Hungarian",
    firstSentence:
      "Üdvözlöm! Én vagyok az Ön AI interjúkészítője. Ma fogom vezetni az Ön {{topic}} interjúját. Mi a neve?",
  },
  {
    code: "id",
    name: "Indonesian",
    firstSentence:
      "Halo! Saya adalah pelatih wawancara AI Anda. Saya akan melakukan wawancara {{topic}} Anda hari ini. Siapa nama Anda?",
  },
  {
    code: "it",
    name: "Italian",
    firstSentence:
      "Ciao! Sono il tuo coach per i colloqui AI. Oggi condurrò il tuo colloquio {{topic}}. Come ti chiami?",
  },
  {
    code: "ja",
    name: "Japanese",
    firstSentence:
      "こんにちは！私はあなたのAI面接コーチです。今日は{{topic}}の面接を行います。お名前を教えてください。",
  },
  {
    code: "ko",
    name: "Korean",
    firstSentence:
      "안녕하세요! 저는 귀하의 AI 면접 코치입니다. 오늘 {{topic}} 면접을 진행할 예정입니다. 이름이 어떻게 되시나요?",
  },
  {
    code: "ms",
    name: "Malay",
    firstSentence:
      "Hai! Saya adalah jurulatih temuduga AI anda. Saya akan menjalankan temuduga {{topic}} anda hari ini. Apa nama anda?",
  },
  {
    code: "no",
    name: "Norwegian",
    firstSentence:
      "Hei! Jeg er din AI-intervjutrener. Jeg skal gjennomføre ditt {{topic}}-intervju i dag. Hva heter du?",
  },
  {
    code: "pl",
    name: "Polish",
    firstSentence:
      "Cześć! Jestem twoim trenerem rozmów kwalifikacyjnych AI. Dziś przeprowadzę twoją rozmowę kwalifikacyjną {{topic}}. Jak masz na imię?",
  },
  {
    code: "pt",
    name: "Portuguese",
    firstSentence:
      "Olá! Sou seu treinador de entrevistas com IA. Vou conduzir sua entrevista de {{topic}} hoje. Qual é o seu nome?",
  },
  {
    code: "ro",
    name: "Romanian",
    firstSentence:
      "Bună! Sunt antrenorul tău de interviuri AI. Voi conduce interviul tău {{topic}} astăzi. Cum te numești?",
  },
  {
    code: "ru",
    name: "Russian",
    firstSentence:
      "Здравствуйте! Я ваш AI-тренер по собеседованиям. Сегодня я проведу ваше собеседование по {{topic}}. Как вас зовут?",
  },
  {
    code: "sk",
    name: "Slovak",
    firstSentence:
      "Ahoj! Som váš AI tréner pohovorov. Dnes budem viesť váš {{topic}} pohovor. Ako sa voláte?",
  },
  {
    code: "es",
    name: "Spanish",
    firstSentence:
      "¡Hola! Soy tu entrenador de entrevistas con IA. Hoy realizaré tu entrevista de {{topic}}. ¿Cómo te llamas?",
  },
  {
    code: "sv",
    name: "Swedish",
    firstSentence:
      "Hej! Jag är din AI-intervjutränare. Jag ska genomföra ditt {{topic}}-intervju idag. Vad heter du?",
  },
  {
    code: "ta",
    name: "Tamil",
    firstSentence:
      "வணக்கம்! நான் உங்கள் AI நேர்காணல் பயிற்சியாளர். இன்று நான் உங்கள் {{topic}} நேர்காணலை நடத்துவேன். உங்கள் பெயர் என்ன?",
  },
  {
    code: "tr",
    name: "Turkish",
    firstSentence:
      "Merhaba! Ben sizin AI mülakat koçunuzum. Bugün {{topic}} mülakatınızı gerçekleştireceğim. Adınız nedir?",
  },
  {
    code: "uk",
    name: "Ukrainian",
    firstSentence:
      "Вітаю! Я ваш AI-тренер зі співбесід. Сьогодні я проведу вашу співбесіду з {{topic}}. Як вас звати?",
  },
  {
    code: "vi",
    name: "Vietnamese",
    firstSentence:
      "Xin chào! Tôi là huấn luyện viên phỏng vấn AI của bạn. Hôm nay tôi sẽ tiến hành cuộc phỏng vấn {{topic}} của bạn. Tên bạn là gì?",
  },
];

interface LanguageDropdownProps {
  setLanguage: (language: string) => void;
  language: string | null;
  languages: typeof LANGUAGES;
}

export function LanguageDropdown({
  setLanguage,
  language,
  languages,
}: LanguageDropdownProps) {
  const currentLanguage = languages.find(lang => lang.code === language)?.name;

  return (
    <div
      className="h-10 opacity-0 transition-opacity duration-300 ease-in-out"
      style={{ opacity: language ? 1 : 0 }}
    >
      {language && (
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-[180px] transition-colors">
            <SelectValue placeholder="Select Language">
              {currentLanguage}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {languages.map(lang => (
              <SelectItem
                key={lang.code}
                value={lang.code}
              >
                {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
