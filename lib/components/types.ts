export type ResponsiveProp<T> = T | {
  sm?: T;
  md?: T;
  lg?: T;
};

export type StrictResponsiveProp<Prop> = Readonly<{
  sm: Prop;
  md: Prop;
  lg: Prop;
}>;