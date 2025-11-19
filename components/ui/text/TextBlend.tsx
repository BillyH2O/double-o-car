interface TextBlendProps {
  align?: "left" | "center" | "right";
  className?: string;
}

export default function TextBlend({ align = "center", className = "" }: TextBlendProps) {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <div className={`flex flex-col gap-8 ${alignClasses[align]} ${className}`}>
    <div className="flex flex-col">
      <p className="text-2xl md:text-3xl xl:text-5xl  font-montserrat font-regular font-weight-400 text-white">
        Prenez la route,
      </p>
      <p className="text-2xl md:text-3xl xl:text-5xl  font-montserrat font-regular font-weight-400 text-gray-500">
        On s&apos;occupe du reste.
      </p>
    </div>
    <p className="text-white text-sm md:text-lg xl:text-2xl font-medium mt-4">Pensé pour vous faire gagner du temps et rendre votre expérience plus agréable</p>
    </div>
  );
}
