"use client";

import { useState } from "react";
import HorizontalFormBlockWrapper from "@/app/shared/account-settings/horiozontal-block";
import {
  Button,
  Text,
  Switch,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Radio,
} from "rizzui";
import { useTranslation } from "@/app/i18n/client";

const generalOptions = [
  {
    title: "text-mentioned-message",
  },
  {
    title: "text-someone-replies-message",
  },
  {
    title: "text-assigned-task",
  },
  {
    title: "text-a-task-overdue",
  },
  {
    title: "text-a-task-status-updated",
  },
];

const summaryOptions = [
  {
    title: "text-daily-summary",
  },
  {
    title: "text-weekly-summary",
  },
  {
    title: "text-monthly-summary",
  },
  {
    title: "text-quarterly-summary",
  },
];

export default function NotificationSettingsView({ lang }: { lang?: string }) {
  const [values, setValues] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const { t } = useTranslation(lang!, "common");

  return (
    <div className="@container">
      <HorizontalFormBlockWrapper
        childrenWrapperClassName="gap-0 @lg:gap-0"
        title={t("text-notifications")}
        description={t("text-notifications-details")}
        titleClassName="text-xl font-semibold"
      />
      <HorizontalFormBlockWrapper
        title={t("text-general-notifications")}
        description={t("text-general-notifications-details")}
        descriptionClassName="max-w-[344px]"
      >
        <div className="col-span-2">
          {generalOptions.map((opt, index) => (
            <div
              key={`generalopt-${index}`}
              className="flex items-center justify-between border-b border-muted py-6 last:border-none last:pb-0"
            >
              <Text className="text-sm font-medium text-gray-900">
                {t(opt.title)}
              </Text>
              <ButtonGroup
                onChange={(option) => console.log(opt.title, option)}
              />
            </div>
          ))}
        </div>
      </HorizontalFormBlockWrapper>
      <HorizontalFormBlockWrapper
        title={t("text-summary-notifications")}
        description={t("text-summary-notifications-details")}
        descriptionClassName="max-w-[344px]"
      >
        <div className="col-span-2">
          {summaryOptions.map((opt, index) => (
            <div
              key={`summaryopt-${index}`}
              className="flex items-center justify-between border-b border-muted py-6 last:border-none last:pb-0"
            >
              <Text className="text-sm font-medium text-gray-900">
                {t(opt.title)}
              </Text>
              <ButtonGroup
                onChange={(option) => console.log(opt.title, option)}
              />
            </div>
          ))}
        </div>
      </HorizontalFormBlockWrapper>
      <HorizontalFormBlockWrapper
        title={t('text-comments')}
        description={t('text-comments-details')}
        descriptionClassName="max-w-[344px]"
      >
        <div className="col-span-2">
          <Switch
            label={t('text-do-not-notify-me')}
            variant="flat"
            labelClassName="font-medium text-sm text-gray-900"
          />
          <Switch
            label={t('text-mentions-only')}
            variant="flat"
            labelClassName="font-medium text-sm text-gray-900"
          />
          <Switch
            label={t('text-all-comments')}
            variant="flat"
            labelClassName="font-medium text-sm text-gray-900"
          />
        </div>
      </HorizontalFormBlockWrapper>
      <HorizontalFormBlockWrapper
        title={t('text-notifications-from-us')}
        description={t('text-notifications-from-us-details')}
        descriptionClassName="max-w-[344px]"
      >
        <div className="col-span-2">
          <CheckboxGroup
            values={values}
            setValues={setValues}
            className="flex flex-col"
          >
            <Checkbox
              name="app_notification"
              label={t('text-news-updates')}
              value="news_updates"
              className="mb-5"
              labelClassName="pl-2 text-sm font-medium !text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
              helperText={t('text-news-updates-details')}
            />
            <Checkbox
              name="app_notification"
              label={t('text-tips-and-tutorials')}
              value="tips_tutorials"
              className="mb-5"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
              helperText={t('text-tips-and-tutorials-details')}
            />
            <Checkbox
              name="app_notification"
              label={t('text-user-research')}
              value="user_research"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
              helperText={t('text-user-research-details')}
            />
          </CheckboxGroup>
        </div>
      </HorizontalFormBlockWrapper>
      <HorizontalFormBlockWrapper
        title={t('text-reminders')}
        description={t('text-reminders-details')}
        descriptionClassName="max-w-[344px]"
      >
        <div className="col-span-2">
          <RadioGroup
            value={value}
            setValue={setValue}
            className="justify-center space-x-4 space-y-4"
          >
            <div className="flex w-full flex-col divide-slate-300 md:w-[500px]">
              <Radio
                name="reminders"
                label={t('text-do-not-notify-me')}
                value="do_not_notify"
                className="mb-5"
                labelClassName="pl-2 text-sm font-medium text-gray-900"
              />
              <Radio
                name="reminders"
                label={t('text-important-reminders-only')}
                value="important_only"
                className="mb-5"
                labelClassName="pl-2 text-sm font-medium text-gray-900"
                helperClassName="text-gray-500 text-sm mt-3 ms-8"
                helperText="Only notify me if the reminder is tagged as important."
              />
              <Radio
                name="reminders"
                value="all_reminder"
                label={t('text-all-reminders')}
                labelClassName="pl-2 text-sm font-medium text-gray-900"
                helperClassName="text-gray-500 text-sm mt-3 ms-8"
                helperText="Notify me for all reminders."
              />
            </div>
          </RadioGroup>
        </div>
      </HorizontalFormBlockWrapper>
      <HorizontalFormBlockWrapper
        title={t('text-more-activity')}
        description={t('text-more-activity-details')}
        descriptionClassName="max-w-[344px]"
        className="border-0 pb-0"
      >
        <div className="col-span-2">
          <RadioGroup
            value={value}
            setValue={setValue}
            className="justify-center space-x-4 space-y-4"
          >
            <div className="flex w-full flex-col divide-slate-300 md:w-[500px]">
              <Radio
                name="activity"
                label={t('text-do-not-notify-me')}
                value="do_not_notify_activity"
                className="mb-5"
                labelClassName="pl-2 text-sm font-medium text-gray-900"
              />
              <Radio
                name="activity"
                value="all_reminder_activity"
                label={t('text-all-reminders')}
                labelClassName="pl-2 text-sm font-medium text-gray-900"
                helperClassName="text-gray-500 text-sm mt-3 ms-8"
                helperText={t('text-all-reminders-details')}
              />
            </div>
          </RadioGroup>
        </div>
      </HorizontalFormBlockWrapper>
    </div>
  );
}

const options = ["None", "In-app", "Email"];

function ButtonGroup({ onChange }: { onChange: (option: string) => void }) {
  const [selected, setSelected] = useState<string>();
  function handleOnClick(option: string) {
    setSelected(option);
    onChange && onChange(option);
  }

  return (
    <div className="inline-flex gap-1">
      {options.map((option) => (
        <Button
          key={option}
          variant={selected === option ? "solid" : "outline"}
          onClick={() => handleOnClick(option)}
        >
          {option}
        </Button>
      ))}
    </div>
  );
}
