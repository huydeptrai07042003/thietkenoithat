import Button from '../button';
import { FaXmark } from 'react-icons/fa6';
import { useRef } from 'react';

interface InputProps {
  title: string;
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const Input = (props: InputProps) => {
  const { title, placeholder, value, setValue } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="flex flex-col gap-2 relative">
      <label className="ms-2">{title}</label>
      <input
        ref={inputRef}
        value={value}
        className="px-10 py-2 border-0 rounded-lg text-black overflow-hidden bg-white"
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <Button
          className="absolute top-[60%] cursor-pointer right-2 text-black"
          onClick={() => {
            setValue('');
            inputRef.current?.focus();
          }}
        >
          <FaXmark />
        </Button>
      )}
    </div>
  );
};

export default Input;
