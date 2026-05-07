import { Textarea } from "@/components/ui/textarea";

export function RichTextEditor({
  name,
  defaultValue,
  placeholder
}: {
  name: string;
  defaultValue?: string;
  placeholder: string;
}) {
  return (
    <Textarea
      name={name}
      defaultValue={defaultValue}
      className="min-h-[460px] font-serif text-base leading-7"
      placeholder={placeholder}
      required
    />
  );
}
