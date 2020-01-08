import { connect } from "react-redux";

import { GET_POST_PAGE } from "../store/post";
import Header from "./component";

const mapStateToProps = (state: any, ownProps: any) => ({
});

const mapDispatchToProps = (dispatch: any) => ({
  setPostPage: (response: any) => dispatch({ type: GET_POST_PAGE, body: response.data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);