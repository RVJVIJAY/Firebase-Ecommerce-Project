import withMT from "@material-tailwind/react/utils/withMT";
// const withMT= require('@material-tailwind/react')
export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
});

