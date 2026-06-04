import UsFlag from "@/assets/flags/us.svg";
import IdFlag from "@/assets/flags/id.svg";
import ArFlag from "@/assets/flags/ar.svg";
import JpFlag from "@/assets/flags/jp.svg";
import CnFlag from "@/assets/flags/cn.svg";
import RuFlag from "@/assets/flags/ru.svg";
import XxFlag from "@/assets/flags/xx.svg";
import { LocaleType } from "@/constants/language";

type FlagsType = {
  locale: LocaleType;
  width?: number;
  height?: number;
};

export default function Flags({ locale, width = 20, height = 15 }: FlagsType) {
  switch (locale) {
    case "en":
      return <UsFlag width={width} height={height} />;
    case "id":
      return <IdFlag width={width} height={height} />;
    case "ar":
      return <ArFlag width={width} height={height} />;
    case "cn":
      return <CnFlag width={width} height={height} />;
    case "jp":
      return <JpFlag width={width} height={height} />;
    case "ru":
      return <RuFlag width={width} height={height} />;
    default:
      return <XxFlag width={width} height={height} />;
  }
}
