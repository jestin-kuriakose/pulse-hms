export const HeadingTwo = (props) => {
  return (
    <h2 className="text-pry-50 font-semibold text-lg">{props.children}</h2>
  );
};

export const HeadingFour = (props) => {
  return (
    <h4 className="text-pry-100 font-medium text-base font-body px-8 lg:px-0">
      {props.children}
    </h4>
  );
};

export const Paragraph = ({ children, fontStyle, textalign }) => {
  return <p className={`font-body ${(fontStyle, textalign)} `}>{children}</p>;
};
