// import * as React from 'react';
// import { Form } from 'antd';
// import { GetSearchOutputResults } from 'src/services/user/dto/SearchOutputResult';



// import { FormComponentProps } from 'antd/lib/form';
// //import rules from './createOrUpdateUser.validation';


// export interface ICmp_PlaceDetailProps extends FormComponentProps {
//   // visible: boolean;
//   // onCancel: () => void;
//   // modalType: string;
//   // onCreate: () => void;
//   SearchOutputResults?: GetSearchOutputResults;
// }

// class Cmp_PlaceDetail extends React.Component<ICmp_PlaceDetailProps> {
//   state = {
//     confirmDirty: false,
//   };


//   render() {
//     const { SearchOutputResults } = this.props;


//     return (

//     <div>
//     <div className="heading">
//     <h2>{SearchOutputResults.name}</h2>
//     <div className="cafe_image">                    
//          {/* <img src={this.SearchOutputResults.photos[0].getUrl({maxWidth: 35, maxHeight: 35})} alt="image" />                         */}
//          <img src="images/cafe.jpg" alt="image"/>
//     </div>
//   </div>
//   <div className="tab_contentarea">
//     <div className="d-table">
//       <div className="d-table-cell list_icons">
//         {/* <p><img src="images/find_2.png" alt="image" /> 0.5 miles away</p>
//         <p><img src="images/address.svg" alt="image" /> {this.SearchOutputResults.formatted_address} </p>
//         <p><img src="images/call.svg" alt="image" />  {this.SearchOutputResults.formatted_phone_number} </p>
//         <p><img src="images/hours.svg" alt="image" /> {this.SearchOutputResults.opening_hours}</p> */}
//       </div>
//     </div>
//     <a href="#" className="follow_cafe"><img src="images/follow-cafe.svg" alt="image" /> Follow cafe in my Feed</a>
//     <hr />
//     <div className="d-table">
//       <div className="d-table-cell desc-cell list_icons2">
//         <p>Serves: Single Origin, Blends</p>
//         <ul className="tab-tag">
//           <li>Average Rating</li>
//           <li>
//             <div className="star-ratings">
//               <img alt="rating" src="images/full cup.png" />
//               <img alt="rating" src="images/full cup.png" />
//               <img alt="rating" src="images/full cup.png" />
//               <img alt="rating" src="images/full cup.png" />
//               <img alt="rating" src="images/empty cup.png" />
//             </div>
//           </li>
//         </ul>
//         <p>My rating: No rating yet. Rate it now </p>
//       </div>
//     </div>
//     <hr />
//     <div className="d-table">
//       <div className="d-table-cell desc-cell list_icons2">
//         <h4>Reviews</h4>
//         <ul className="tab-tag">
//           <li>Andy S.</li>
//           <li>
//             <div className="star-ratings">
//               <img alt="rating" src="images/full cup.png" />
//               <img alt="rating" src="images/full cup.png" />
//               <img alt="rating" src="images/full cup.png" />
//               <img alt="rating" src="images/full cup.png" />
//               <img alt="rating" src="images/empty cup.png" />
//             </div>
//           </li>
//           <li>Feb 2, 2018</li>
//         </ul>
//         <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
//       </div>
//     </div>
//   </div>
//   </div>


//     );
//   }
// }

// export default Form.create()(Cmp_PlaceDetail);
   













// //    import * as React from 'react';
// // //import AuthenticationStore from 'src/stores/authenticationStore';
// // // import { inject } from 'mobx-react';
// // // import Stores from 'src/stores/storeIdentifier';
// // import AppComponentBase from 'src/components/AppComponentBase';
// // import Stores from 'src/stores/storeIdentifier';
// // import UserStore from 'src/stores/userStore';
// // import { observer, inject } from 'mobx-react';
// // import { FormComponentProps } from 'antd/lib/form';
// // //import { GetSearchOutputResults } from 'src/services/user/dto/SearchOutputResult';
// // import { searchUserInput } from 'src/services/user/dto/searchUserInput';
// // import { Form } from 'antd';

// // export interface ICmp_PlaceDetailProps extends FormComponentProps,searchUserInput {
// //   userStore: UserStore;
// // }

// // export interface ICmp_PlaceDetailState {
// //   userId: number;
// // }

// //  @inject(Stores.UserStore)
// //  @observer
// // class Cmp_PlaceDetail extends AppComponentBase<ICmp_PlaceDetailProps, ICmp_PlaceDetailState,searchUserInput> {
// //   componentDidMount() {
    
// //   }

// //   render() {

// //     <div>
// //     <div className="heading">
// //     {/* <h2>{this.SearchOutputResults.name}</h2> */}
// //     <div className="cafe_image">                    
// //          {/* <img src={this.SearchOutputResults.photos[0].getUrl({maxWidth: 35, maxHeight: 35})} alt="image" />                         */}
// //          <img src="images/cafe.jpg" alt="image"/>
// //     </div>
// //   </div>
// //   <div className="tab_contentarea">
// //     <div className="d-table">
// //       <div className="d-table-cell list_icons">
// //         {/* <p><img src="images/find_2.png" alt="image" /> 0.5 miles away</p>
// //         <p><img src="images/address.svg" alt="image" /> {this.SearchOutputResults.formatted_address} </p>
// //         <p><img src="images/call.svg" alt="image" />  {this.SearchOutputResults.formatted_phone_number} </p>
// //         <p><img src="images/hours.svg" alt="image" /> {this.SearchOutputResults.opening_hours}</p> */}
// //       </div>
// //     </div>
// //     <a href="#" className="follow_cafe"><img src="images/follow-cafe.svg" alt="image" /> Follow cafe in my Feed</a>
// //     <hr />
// //     <div className="d-table">
// //       <div className="d-table-cell desc-cell list_icons2">
// //         <p>Serves: Single Origin, Blends</p>
// //         <ul className="tab-tag">
// //           <li>Average Rating</li>
// //           <li>
// //             <div className="star-ratings">
// //               <img alt="rating" src="images/full cup.png" />
// //               <img alt="rating" src="images/full cup.png" />
// //               <img alt="rating" src="images/full cup.png" />
// //               <img alt="rating" src="images/full cup.png" />
// //               <img alt="rating" src="images/empty cup.png" />
// //             </div>
// //           </li>
// //         </ul>
// //         <p>My rating: No rating yet. Rate it now </p>
// //       </div>
// //     </div>
// //     <hr />
// //     <div className="d-table">
// //       <div className="d-table-cell desc-cell list_icons2">
// //         <h4>Reviews</h4>
// //         <ul className="tab-tag">
// //           <li>Andy S.</li>
// //           <li>
// //             <div className="star-ratings">
// //               <img alt="rating" src="images/full cup.png" />
// //               <img alt="rating" src="images/full cup.png" />
// //               <img alt="rating" src="images/full cup.png" />
// //               <img alt="rating" src="images/full cup.png" />
// //               <img alt="rating" src="images/empty cup.png" />
// //             </div>
// //           </li>
// //           <li>Feb 2, 2018</li>
// //         </ul>
// //         <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
// //       </div>
// //     </div>
// //   </div>
// //   </div>
// //   }
// // }

// // export default Form.create()(Cmp_PlaceDetail);
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   