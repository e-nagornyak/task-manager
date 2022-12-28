import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";
import {TaskWithRedux} from "./TaskWithRedux";
import {TaskType} from "./App";

export default {
    title: 'TODOLISTS/TaskWithRedux',
    component: TaskWithRedux
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof TaskWithRedux> = (args) => <TaskWithRedux {...args} />;

// export const TaskIsDoneStory = Template.bind({});
// TaskIsDoneStory.args = {
//     task: {id: '123', isDone: true, title: 'JS'},
//     todolistId: '1',
// };

// export const TaskIsDoneStory = Template.bind({});
// TaskIsDoneStory.args = {
//
// };