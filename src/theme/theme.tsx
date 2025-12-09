import './styles/palette.css';

import {
  Accordion,
  ActionIcon,
  Alert,
  AppShell,
  Badge,
  Button,
  Checkbox,
  Combobox,
  createTheme,
  Divider,
  Drawer,
  Loader,
  Menu,
  Modal,
  NavLink,
  Notification,
  NumberInput,
  Pagination,
  Paper,
  PasswordInput,
  PinInput,
  Popover,
  Progress,
  Radio,
  Select,
  Stepper,
  Switch,
  Table,
  Tabs,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { DateInput, DatePicker, DateTimePicker } from '@mantine/dates';
import { Dropzone } from '@mantine/dropzone';

import { colors } from '@/theme/colors.ts';

import actionIconClasses from './styles/components/actionIcon.module.css';
import accordionClasses from './styles/components/accodion.module.css';
import appShellClasses from './styles/components/appShell.module.css';
import badgeClasses from './styles/components/badge.module.css';
import dividerClasses from './styles/components/divider.module.css';
import dropzoneClasses from './styles/components/dropzone.module.css';
import datePicker from './styles/components/datePicker.module.css';
import buttonClasses from './styles/components/button.module.css';
import inputClasses from './styles/components/input.module.css';
import tabsClasses from './styles/components/tabs.module.css';
import titleClasses from './styles/components/title.module.css';
import textClasses from './styles/components/text.module.css';
import tableClasses from './styles/components/table.module.css';
import paperClasses from './styles/components/paper.module.css';
import popoverClasses from './styles/components/popover.module.css';
import navLinkClasses from './styles/components/navLink.module.css';
import dropdownClasses from './styles/components/dropdown.module.css';
import drawerClasses from './styles/components/drawer.module.css';
import carouselClasses from './styles/components/carousel.module.css';
import comboxClasses from './styles/components/combox.module.css';
import checkboxClasses from './styles/components/checkbox.module.css';
import radioClasses from './styles/components/radio.module.css';
import alertClasses from './styles/components/alert.module.css';
import menuClasses from './styles/components/menu.module.css';
import loaderClasses from './styles/components/loader.module.css';
import progressClasses from './styles/components/progress.module.css';
import notificationClasses from './styles/components/notification.module.css';
import modalClasses from './styles/components/modal.module.css';
import switchClasses from './styles/components/switch.module.css';
import selectClasses from './styles/components/select.module.css';
import stepperClasses from './styles/components/stepper.module.css';
import paginationClasses from './styles/components/pagination.module.css';

export const theme = createTheme({
  colors: colors,
  fontFamily: 'Inter, serif',
  headings: { fontFamily: 'Nunito Sans, sans-serif' },

  components: {
    ActionIcon: ActionIcon.extend({
      classNames: actionIconClasses,
    }),
    Accordion: Accordion.extend({
      classNames: accordionClasses,
    }),
    AppShell: AppShell.extend({ classNames: appShellClasses }),

    Badge: Badge.extend({
      classNames: badgeClasses,
    }),

    Carousel: Carousel.extend({ classNames: carouselClasses }),

    Alert: Alert.extend({
      classNames: alertClasses,
    }),

    Button: Button.extend({
      defaultProps: {
        size: 'md',
        variant: 'accent',
      },
      classNames: { root: buttonClasses.root, loader: buttonClasses.loader },
    }),

    Checkbox: Checkbox.extend({
      classNames: checkboxClasses,
    }),

    Combobox: Combobox.extend({
      classNames: {
        dropdown: dropdownClasses.root,
        options: comboxClasses.options,
        option: comboxClasses.option,
      },
    }),

    DateInput: DateInput.extend({
      classNames: {
        root: inputClasses.root,
        input: inputClasses.input,
        wrapper: inputClasses.wrapper,
        weekday: datePicker.weekday,
        levelsGroup: datePicker.levelsGroup,
        calendarHeaderControl: datePicker.calendarHeaderControl,
        calendarHeaderLevel: datePicker.calendarHeaderLevel,
        day: datePicker.day,
        label: inputClasses.label,
        error: inputClasses.error,
      },
    }),

    DatePicker: DatePicker.extend({
      classNames: datePicker,
    }),

    DateTimePicker: DateTimePicker.extend({
      classNames: {
        root: inputClasses.root,
        input: inputClasses.input,
        wrapper: inputClasses.wrapper,
        weekday: datePicker.weekday,
        levelsGroup: datePicker.levelsGroup,
        calendarHeaderControl: datePicker.calendarHeaderControl,
        calendarHeaderLevel: datePicker.calendarHeaderLevel,
        day: datePicker.day,
        timeInput: datePicker.timeInput,
        submitButton: datePicker.submitButton,
        label: inputClasses.label,
      },
    }),

    Drawer: Drawer.extend({
      defaultProps: {
        keepMounted: true,
      },
      classNames: drawerClasses,
    }),

    Dropzone: Dropzone.extend({
      classNames: dropzoneClasses,
    }),

    Divider: Divider.extend({
      classNames: dividerClasses,
    }),

    Notification: Notification.extend({
      classNames: notificationClasses,
    }),

    Loader: Loader.extend({
      classNames: loaderClasses,
    }),

    Paper: Paper.extend({
      classNames: {
        root: paperClasses.root,
      },
    }),

    PasswordInput: PasswordInput.extend({
      classNames: {
        root: inputClasses.root,
        wrapper: inputClasses.wrapper,
        label: inputClasses.label,
        input: inputClasses.input,
        error: inputClasses.error,
      },
    }),

    PinInput: PinInput.extend({
      classNames: {
        root: inputClasses.root,
        input: inputClasses.input,
      },
    }),

    Switch: Switch.extend({
      defaultProps: {
        size: 'md',
      },
      classNames: {
        root: switchClasses.root,
        thumb: switchClasses.thumb,
        track: switchClasses.track,
        trackLabel: switchClasses.trackLabel,
        input: switchClasses.input,
      },
    }),

    Popover: Popover.extend({
      classNames: {
        dropdown: popoverClasses.dropdown,
      },
    }),

    Progress: Progress.extend({
      classNames: progressClasses,
    }),

    NavLink: NavLink.extend({
      classNames: {
        root: navLinkClasses.root,
        label: navLinkClasses.label,
        chevron: navLinkClasses.chevron,
        section: navLinkClasses.section,
      },
    }),

    Menu: Menu.extend({
      classNames: {
        dropdown: popoverClasses.dropdown,
        item: menuClasses.menuItem,
      },
    }),

    Modal: Modal.extend({
      classNames: modalClasses,
    }),

    Radio: Radio.extend({
      classNames: radioClasses,
    }),

    Tabs: Tabs.extend({
      classNames: tabsClasses,
    }),

    Table: Table.extend({
      classNames: tableClasses,
    }),

    Title: Title.extend({
      classNames: titleClasses,
    }),

    Textarea: Textarea.extend({
      classNames: {
        root: inputClasses.root,
        wrapper: inputClasses.wrapper,
        label: inputClasses.label,
        input: inputClasses.input,
        error: inputClasses.error,
      },
    }),

    Text: Text.extend({
      classNames: textClasses,
    }),

    TextInput: TextInput.extend({
      classNames: {
        root: inputClasses.root,
        wrapper: inputClasses.wrapper,
        label: inputClasses.label,
        input: inputClasses.input,
        error: inputClasses.error,
      },
    }),

    NumberInput: NumberInput.extend({
      classNames: {
        root: inputClasses.root,
        wrapper: inputClasses.wrapper,
        label: inputClasses.label,
        input: inputClasses.input,
        error: inputClasses.error,
      },
    }),

    Select: Select.extend({
      classNames: {
        root: inputClasses.root,
        wrapper: selectClasses.wrapper,
        label: inputClasses.label,
        input: selectClasses.input,
        option: selectClasses.option,
        section: selectClasses.section,
        error: selectClasses.error,
      },
      styles: {
        input: { cursor: 'pointer' },
      },
    }),

    Stepper: Stepper.extend({
      defaultProps: {
        completedIcon: ({ step }) => <span>{step + 1}</span>,
      },
      classNames: {
        steps: stepperClasses.steps,
        step: stepperClasses.step,
        stepWrapper: stepperClasses.stepWrapper,
        stepIcon: stepperClasses.stepIcon,
        separator: stepperClasses.separator,
        stepBody: stepperClasses.stepBody,
        stepLabel: stepperClasses.stepLabel,
        stepCompletedIcon: stepperClasses.stepCompletedIcon,
      },
    }),

    Pagination: Pagination.extend({
      classNames: paginationClasses,
    }),
  },
});
