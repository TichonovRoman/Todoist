import React, {ChangeEvent} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {action} from "@storybook/addon-actions";
import {Task} from "./Task";



// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLIST/Task',
  component: Task,
  args: {
    onChangeHandler: action("onChangeHandler"),
    callbackHandlerForUpdateTask: action("callbackHandlerForUpdateTask"),
    onClickHandlerTaskRemove: action("onClickHandlerTaskRemove"),
  }
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsDoneStory.args = {
  isDone: true,
  title: "One task",

};
export const TaskIsNoteDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsNoteDoneStory.args = {
  isDone: false,
  title: "One task",
};

