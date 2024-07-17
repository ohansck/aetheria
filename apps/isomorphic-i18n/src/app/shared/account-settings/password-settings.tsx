"use client";

import { useState } from "react";
import { SubmitHandler, Controller } from "react-hook-form";
import { PiDesktop } from "react-icons/pi";
import { Form } from "@ui/form";
import { Button, Password, Title, Text } from "rizzui";
import cn from "@utils/class-names";
import { ProfileHeader } from "@/app/shared/account-settings/profile-settings";
import HorizontalFormBlockWrapper from "@/app/shared/account-settings/horiozontal-block";
import {
  passwordFormSchema,
  PasswordFormTypes,
} from "@/validators/password-settings.schema";
import { useTranslation } from "@/app/i18n/client";

export default function PasswordSettingsView({
  settings,
  lang,
}: {
  settings?: PasswordFormTypes;
  lang?: string;
}) {
  const [isLoading, setLoading] = useState(false);
  const [reset, setReset] = useState({});
  const { t } = useTranslation(lang!, "form");

  const onSubmit: SubmitHandler<PasswordFormTypes> = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setReset({
        currentPassword: "",
        newPassword: "",
        confirmedPassword: "",
      });
    }, 600);
  };

  return (
    <>
      <Form<PasswordFormTypes>
        validationSchema={passwordFormSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        className="@container"
        useFormProps={{
          mode: "onChange",
          defaultValues: {
            ...settings,
          },
        }}
      >
        {({ register, control, formState: { errors }, getValues }) => {
          return (
            <>
              <ProfileHeader
                title="Olivia Rhye"
                description="olivia@example.com"
              />

              <div className="mx-auto w-full max-w-screen-2xl">
                <HorizontalFormBlockWrapper
                  title={t("form-current-password")}
                  titleClassName="text-base font-medium"
                >
                  <Password
                    {...register("currentPassword")}
                    placeholder={t("form-password-placeholder")}
                    error={t(errors.currentPassword?.message!)}
                  />
                </HorizontalFormBlockWrapper>

                <HorizontalFormBlockWrapper
                  title={t("form-new-password")}
                  titleClassName="text-base font-medium"
                >
                  <Controller
                    control={control}
                    name="newPassword"
                    render={({ field: { onChange, value } }) => (
                      <Password
                        placeholder={t("form-password-placeholder")}
                        helperText={
                          getValues().newPassword.length < 8 &&
                          t("form-password-helper-text")
                        }
                        onChange={onChange}
                        error={t(errors.newPassword?.message!)}
                      />
                    )}
                  />
                </HorizontalFormBlockWrapper>

                <HorizontalFormBlockWrapper
                  title={t("form-confirm-new-password")}
                  titleClassName="text-base font-medium"
                >
                  <Controller
                    control={control}
                    name="confirmedPassword"
                    render={({ field: { onChange, value } }) => (
                      <Password
                        placeholder={t("form-password-placeholder")}
                        onChange={onChange}
                        error={t(errors.confirmedPassword?.message!)}
                      />
                    )}
                  />
                </HorizontalFormBlockWrapper>

                <div className="mt-6 flex w-auto items-center justify-end gap-3">
                  <Button type="button" variant="outline">
                    {t("form-cancel")}
                  </Button>
                  <Button type="submit" variant="solid" isLoading={isLoading}>
                    {t("form-update-password")}
                  </Button>
                </div>
              </div>
            </>
          );
        }}
      </Form>
      <LoggedDevices className="mt-10" />
    </>
  );
}

// Logged devices
function LoggedDevices({
  className,
  lang,
}: {
  className?: string;
  lang?: string;
}) {
  const { t } = useTranslation(lang!, "form");

  return (
    <div className={cn("mx-auto w-full max-w-screen-2xl", className)}>
      <div className="border-b border-dashed border-muted">
        <Title as="h2" className="mb-3 text-xl font-bold text-gray-900">
          {t("text-where-you-logged-in")}
        </Title>
        <Text className="mb-6 text-sm text-gray-500">
          {t("text-where-you-logged-in-description")}
        </Text>
      </div>
      <div className="flex items-center gap-6 border-b border-dashed border-muted py-6">
        <PiDesktop className="h-7 w-7 text-gray-500" />
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Title
              as="h3"
              className="text-base font-medium text-gray-900 dark:text-gray-700"
            >
              {t("text-1st-device")}
            </Title>
            <Text
              as="span"
              className="relative hidden rounded-md border border-muted py-1.5 pe-2.5 ps-5 text-xs font-semibold text-gray-900 before:absolute before:start-2.5 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:bg-green sm:block"
            >
              {t("text-active-now")}
            </Text>
          </div>
          <div className="flex items-center gap-2">
            <Text className="text-sm text-gray-500">
              {t("text-country-address")}
            </Text>
            <span className="h-1 w-1 rounded-full bg-gray-600" />
            <Text className="text-sm text-gray-500">
              {t("text-logged-in-time")}
            </Text>
          </div>
          <Text
            as="span"
            className="relative mt-2 inline-block rounded-md border border-muted py-1.5 pe-2.5 ps-5 text-xs font-semibold text-gray-900 before:absolute before:start-2.5 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:bg-green sm:hidden"
          >
            {t("text-active-now")}
          </Text>
        </div>
      </div>
      <div className="flex items-center gap-6 py-6">
        <PiDesktop className="h-7 w-7 text-gray-500" />
        <div>
          <Title
            as="h3"
            className="mb-2 text-base font-medium text-gray-900 dark:text-gray-700"
          >
            {t("text-2nd-device")}
          </Title>
          <div className="flex items-center gap-2">
            <Text className="text-sm text-gray-500">
              {t("text-country-address")}
            </Text>
            <span className="h-1 w-1 rounded-full bg-gray-600" />
            <Text className="text-sm text-gray-500">
              {t("text-logged-in-time")}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
