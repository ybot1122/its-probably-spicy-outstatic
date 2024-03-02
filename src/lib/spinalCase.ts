const spinalCase = (str: string) => {
  return str
    .split(" ") //splits the string into pieces at spaces
    .map((c) => c.toLowerCase()) //makes each piece lowercase
    .join("-"); //combines each piece with a "-"
};

export default spinalCase;
