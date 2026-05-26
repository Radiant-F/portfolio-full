import UsFlag from "@/assets/flags/us.svg";
import IdFlag from "@/assets/flags/id.svg";
import IlFlag from "@/assets/flags/il.svg";
import PkFlag from "@/assets/flags/pk.svg";
import SaFlag from "@/assets/flags/sa.svg";
import XxFlag from "@/assets/flags/xx.svg";
import JpFlag from "@/assets/flags/jp.svg";
import CnFlag from "@/assets/flags/cn.svg";
import RuFlag from "@/assets/flags/ru.svg";
import SuFlag from "@/assets/flags/su.svg";

type FlagsType = {
  locale: "en" | "id" | "sundanese" | "ar" | "he" | "ur" | "jp" | "cn" | "ru";
  width?: number;
  height?: number;
};

export default function Flags({ locale, width = 20, height = 15 }: FlagsType) {
  switch (locale) {
    case "en":
      return <UsFlag width={width} height={height} />;
    case "id":
      return <IdFlag width={width} height={height} />;
    case "he":
      return <IlFlag width={width} height={height} />;
    case "ur":
      return <PkFlag width={width} height={height} />;
    case "ar":
      return <SaFlag width={width} height={height} />;
    case "cn":
      return <CnFlag width={width} height={height} />;
    case "jp":
      return <JpFlag width={width} height={height} />;
    case "ru":
      return <RuFlag width={width} height={height} />;
    case "sundanese":
      return <SuFlag width={width} height={height} />;
    default:
      return <XxFlag width={width} height={height} />;
  }
}
