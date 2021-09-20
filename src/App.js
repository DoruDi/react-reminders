import React, {useEffect, useState} from "react";
import {Button,Container,TextField} from "@mui/material";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import Category from "./Category";
import ReminderList from './ReminderList'

function App() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [showRemoveCategory, setShowRemoveCategory] = useState(false);
    const [name, setName] = useState('');
    const [activeCategory, setActiveCategory] = useState(0);
    const [activeList, setActiveList] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedId, setEditedId] = useState(null);


    useEffect(() => {
        setLoading(true)
       let myData = localStorage.getItem('reminderList')
        myData = JSON.parse(myData)
        setData(myData)
        setLoading(false)
    }, []);

    useEffect(() => {
        let activeObject = data[activeCategory] ?? {}
        let specificList = activeObject.list;
        setActiveList(specificList)
    },[activeCategory,data])

    useEffect(() => {
        setShowRemoveCategory(false)
    },[data])

    useEffect(() => {
        setLoading(true)
        // console.log(data)
        localStorage.setItem('reminderList', JSON.stringify(data))
        setLoading(false)
    },[data])

    useEffect(() => {
        if(activeCategory >= data.length) {
            setActiveCategory(0)
        }
    },[data.length, activeCategory])

    const handleCategoryBtnClicked = () => {
        if(!categoryName) {
            document.querySelector('#category').focus()
            return
        }
        let newCategory = {category: categoryName, list: []}
        setData([...data, newCategory])
        setCategoryName('')
    }

    const deleteCategory = (index) => {
        let newData = data.filter(item => data.indexOf(item) !== index)
        setData(newData)
        if(activeCategory === index) {
            setActiveCategory(0)
        }
    }
    const handleActive = (index) => {
        setActiveCategory(index)
    }
    const removeFromList = (id) => {
       const newActiveList = activeList.filter(item => item.id !== id)
        // setActiveList(newActiveList)
        let nextData = data.map(item => {
            if(data.indexOf(item) === activeCategory) {
                item = {...item, list: newActiveList}
            }
            return item
        })
        setData(nextData)
    }

    const handleEdit = (id) => {
        setIsEditing(true)
        let editEl = data[activeCategory].list.filter(item => item.id === id)
        setEditedId(id)
        setName(editEl[0].title)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(isEditing) {
            let editEl = data[activeCategory].list.filter(item => item.id === editedId)[0]
            let changedEl = {...editEl, title: name}
            let newDataEdited = data.map(item => {
                if(data.indexOf(item) === activeCategory) {
                    item.list.map(item => {
                        if(item.id === editedId){
                            item.title = changedEl.title

                        }
                        return item
                    })
                    return item
                }
                return item
            })
            if(!name) {
                document.querySelector('h2').innerText = 'Please Enter Content'
                document.querySelector('h2').style.color = 'red'
                document.getElementById('outlined-multiline-flexible').focus()
                return;
            }
            setData(newDataEdited)

            setName('')
            setIsEditing(false)
            return;
        }
        // setLoading(true);
        if (!name) {
            document.getElementById('outlined-multiline-flexible').focus()
            document.querySelector('h2').style.color = 'red'
            document.querySelector('h2').innerText = 'Please Enter Content'
            return
        }

        let specificObj = {
            id: new Date().getTime().toString(),
            title: name
        }
        let newListObject = data.map(item => {
            if(data.indexOf(item) === activeCategory) {
                let {list} = item
                item = {...item, list: [...list, specificObj] }

            }
            return item
        })
        setData(newListObject)
        setLoading(false)

        // console.log(newListObject)

        setName('')
    }
    if (name) {
        document.querySelector('h2').style.color = '#555'
        document.querySelector('h2').innerText = data[activeCategory].category
    }

    if(loading) {
        return <h1 className={'loading'}>Loading ...</h1>
    }


    return (
    <Container maxWidth="xl" className="main-container">
        <h1>Reminder</h1>
        <section>
            <div className="side-container">
                <div className='addCategory'>
                    <input type="text" id='category' placeholder={'new category'}
                           value={categoryName}
                           onChange={(e) => setCategoryName(e.target.value)}
                    />
                    <Button variant="contained" size="small"
                            className="addCategoryBtn" onClick={handleCategoryBtnClicked}>Category
                        <AddCircleOutlineOutlinedIcon className={'add-category'} fontSize={'small'}/>
                    </Button>
                </div>
                <div className="categories">
                    {data.length > 0 && data.map((item, index) => {
                        return <Category  key={index} data={data} index={index} deleteCategory={deleteCategory}
                                         showRemoveCategory={showRemoveCategory} activeCategory={activeCategory}
                                          handleActive={handleActive}/>
                    })}

                </div>
                {data.length > 0  && <Button variant="contained" size="small"
                                             className="removeCategoryBtn" onClick={() =>setShowRemoveCategory(!showRemoveCategory) }>Category
                                          <DoDisturbOnOutlinedIcon className={'remove-btn'} fontSize={'small'}/>
                                    </Button>}
            </div>
            <Container className='form-list-container'>
                <h2 className={'activeCategoryName'}>
                    {data.length > 0? data[activeCategory].category: ''}
                </h2>
                <form>
                    <div className="box-input"
                        // noValidate
                        // autoComplete="off"
                       >
                       <TextField
                          id="outlined-multiline-flexible"
                          label="Add to List"
                          size="small"
                          multiline
                          // maxRows={4}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                      />

                        <Button type="submit" className="submitBtn" variant='contained' size="medium"
                                onClick={handleSubmit}
                        >{isEditing?'Edit': 'Submit'}</Button>
                    </div>
                </form>
                <div className="reminder-list">
                    <ul>
                        {
                            activeList !== undefined && activeList.map(item => {
                                return (
                                  <ReminderList key={item.id} removeFromList={removeFromList}
                                                handleEdit={handleEdit} title={item.title} id={item.id}/>
                                )
                            })}
                    </ul>

                </div>
            </Container>

        </section>

    </Container>
  )
}

export default App;


