import PropTypes from "prop-types";
import Footer from "../Components/Footer";
import Header from "../Components/Header";


const PrivateLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

// Here's the prop validation for children
PrivateLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateLayout;
