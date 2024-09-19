import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import styled from 'styled-components'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class Form extends Component {
  state = {
    taskList: [],
    tab: tagsList[0].optionId,
    taskName: '',
    activeTab: '',
  }

  onAddTaskToTaskList = event => {
    event.preventDefault()
    const {tab, taskName} = this.state

    if (taskName) {
      this.setState(prevState => ({
        taskList: [...prevState.taskList, {tab, taskName, id: uuidv4()}],
        tab: tagsList[0].optionId,
        taskName: '',
      }))
    }
  }

  onChangeInput = event => {
    this.setState({taskName: event.target.value})
  }

  onChangeTab = event => {
    this.setState({tab: event.target.value})
  }

  onUpdateActiveTab = id => {
    this.setState({activeTab: id})
  }

  onRenderForm = () => {
    const {tab, taskName} = this.state

    return (
      <FormContainer>
        <InputContainer>
          <Label htmlFor="taskname">Task</Label>
          <Input
            type="text"
            placeholder="Enter the task here"
            id="taskname"
            onChange={this.onChangeInput}
            value={taskName}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="tabs">Tags</Label>
          <Select value={tab} onChange={this.onChangeTab} id="tabs">
            {tagsList.map(each => (
              <Option value={each.optionId} key={each.optionId}>
                {each.displayText}
              </Option>
            ))}
          </Select>
        </InputContainer>
        <Button type="button" onClick={this.onAddTaskToTaskList}>
          Add Task
        </Button>
      </FormContainer>
    )
  }

  onRenderTaksList = () => {
    const {taskList, activeTab} = this.state

    const filteredList = activeTab
      ? taskList.filter(each => each.tab === activeTab)
      : taskList

    return (
      <TaskListContainer>
        {filteredList.map(each => (
          <TaskListItem key={each.id}>
            <Text>{each.taskName}</Text>
            <TagBox>{each.tab}</TagBox>
          </TaskListItem>
        ))}
      </TaskListContainer>
    )
  }

  render() {
    const {activeTab, taskList} = this.state
    return (
      <Container>
        <LeftContainer>
          <Heading>Create a task!</Heading>
          {this.onRenderForm()}
        </LeftContainer>
        <RightContainer>
          <SubHeading>Tags</SubHeading>
          <TagContainer>
            {tagsList.map(each => (
              <TagListItem key={each.optionId}>
                <TagButton
                  type="button"
                  onClick={() => this.onUpdateActiveTab(each.optionId)}
                  isActive={each.optionId === activeTab}
                >
                  {each.displayText}
                </TagButton>
              </TagListItem>
            ))}
          </TagContainer>
          <SubHeading>Tasks</SubHeading>
          {taskList.length > 0 ? (
            this.onRenderTaksList()
          ) : (
            <Text>No Tasks Added Yet</Text>
          )}
        </RightContainer>
      </Container>
    )
  }
}

export default Form

const Container = styled.div`
  min-height:100vh;
  background-color:#131213;
  padding:5rem 3rem;
  display:flex;
  justify-content:space-between;
`

const LeftContainer = styled.div`
  display:flex;
  flex-direction:column;
  row-gap:3rem;
  width:30%;
  align-items:center;
`

const Heading = styled.h1`
  color:#f3aa4e;
  font-size:3rem;
  font-weight:bold;
`

const FormContainer = styled.form`
  display:flex;
  flex-direction:column;
  row-gap:2.5rem;
  width:100%;
  
`

const Button = styled.button`
  background-color:#f3aa4e;
  padding:1rem 2rem;
  border-radius:8px;
  color:white;
  align-self:center;

`

const InputContainer = styled.div`
  display:flex;
  flex-direction:column;
  row-gap:1rem;
  width:100%;

`

const Label = styled.label`
  color:white;
  font-weight:bold;
  font-size:2rem;
`
const Input = styled.input`

  background-color:white;
  font-size:2rem;
  color:black;
  padding:1rem;
  width:100%;
`

const Select = styled.select`

  background-color:white;
  font-size:2rem;
  color:black;
  padding:1rem;
  width:100%;

`

const Option = styled.option``

// right container

const RightContainer = styled.div`
  width:60%;
  display:flex;
  flex-direction:column;
  row-gap:3rem;

`

const TagContainer = styled.ul`
  display:flex;
  column-gap:1rem;
`

const TagListItem = styled.li``

const TagButton = styled.button`
  background-color:${props => (props.isActive ? '#f3aa4e' : 'transparent')};
  color:white;
  border:1px solid #f3aa4e;
  padding:1rem 2rem;
  border-radius:8px;

`
const SubHeading = styled.h1`
  font-size:2rem;
  color:white;
  font-weight:bold;
`

// tasklist

const TaskListContainer = styled.ul`
  display:flex;
  flex-direction:column;
  row-gap:1.5rem;
`

const TaskListItem = styled.li`
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:1rem 2rem;
  opacity:0.8;
  background-color: #1a171d;

`

const Text = styled.p`
  font-weight:bold;
  font-size:2rem;
  color:white;

`

const TagBox = styled.p`
  background-color:#f3aa4e;
  width:100px;
  border-radius:8px;
  color:darkblue;
  padding:1rem 1rem;
  font-weight:bold;
`
