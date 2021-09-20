import React from 'react';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';


class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: 'false',
            counter: 0
        }
    }

   render() {

       return (
           <div className="categoryNameDiv">
               <span className={`categoryName ${this.props.activeCategory === this.props.index && 'active'}`}
                     onClick={() => this.props.handleActive(this.props.index)}
               >{this.props.data[this.props.index].category}</span>

               {this.props.showRemoveCategory &&<HighlightOffSharpIcon className='closeCategory' fontSize="small"
                                                                       onClick={() => this.props.deleteCategory(this.props.index)}

               />}
           </div>
       );
   }

};

export default Category;
