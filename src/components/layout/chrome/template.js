export const template = {
  sm: {
    rows: "56px auto 56px 56px",
    columns: "auto",
    area: ` 
   "header "
   "main"
   "sidebar"   
   "footer"  
   `
  },
  md: {
    rows: "56px auto auto 10%",
    columns: "10% auto auto auto",
    area: ` 
   "header header header header"
   "sidebar main main main"
   "sidebar main main main"
   "footer footer footer footer"  
   `
  },
  lg: {
    rows: "56px auto 40px",
    columns: "10% auto auto auto auto",
    area: ` 
   "header header header header header"
   "sidebar main main main aside"
   "footer footer footer footer footer"  
   `
  },
  xl: {
    rows: "56px auto 40px",
    columns: "10% auto auto auto auto",
    area: ` 
   "header header header header header"
   "sidebar main main main aside"
   "footer footer footer footer footer"  
   `
  }
};
