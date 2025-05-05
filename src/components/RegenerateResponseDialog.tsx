import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";

type Props = {
  children: React.ReactNode;
};

function RegenerateResponseDialog({ children }: Props) {
  const [customText, setCustomText] = useState("");

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Customize your result</DialogTitle>
        </DialogHeader>
        <div>
          <Textarea
            className="bg-white h-[250px]"
            placeholder="✍🏼 Write what you would like to be changed?"
            value={customText}
            id="additional"
            onChange={(e) => {
              setCustomText(e.target.value);
            }}
          />
          <Button
            className={`w-full mt-4 bg-gradient-to-r from-cyan-400 via-teal-400 to-green-400 text-white font-semibold py-2 px-4  shadow-md hover:opacity-90 transition duration-300 disabled:cursor-not-allowed`}>
            Generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default RegenerateResponseDialog;
