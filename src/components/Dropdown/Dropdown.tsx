import { useEffect, useRef, useState } from "react";
import style from "./Dropdown.module.css";
import { IData } from "../../pages/HomePage/HomePage";

interface IDropdownProps {
  options: IData[];
  changeStatePay(
    id: number,
    tableName: string,
    primaryKey: string,
    price: number,
    sum: number,
    sale: number,
    name: string
  ): void;
}

const Dropdown: React.FC<IDropdownProps> = ({ options, changeStatePay }) => {
  const container = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleDropdownClick = () => setIsOpen(!isOpen);

  const handleClickOutside = (e: MouseEvent) => {
    if (container.current && !container.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectItem = (option: IData) => {
    setSelectedOption(option.NAME);
    setIsOpen(false);
    changeStatePay(
      option.ID,
      option.TABLENAME,
      option.PRIMARYKEY,
      option.PRICE,
      option.SUMMA,
      option.DISCOUNT,
      option.NAME
    );
  };

  return (
    <div className={style.dropdown} ref={container}>
      <button
        type="button"
        className={style.dropdown_button}
        onClick={handleDropdownClick}
      >
        {selectedOption ? selectedOption : "Выберите сертификат"}
      </button>
      {isOpen && (
        <ul className={style.dropdown_menu}>
          {options.map((option, index) => (
            <li
              key={index}
              className={style.dropdown_item}
              onClick={() => handleSelectItem(option)}
            >
              {option.NAME}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
