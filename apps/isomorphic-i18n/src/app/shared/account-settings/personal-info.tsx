'use client';

import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { SubmitHandler, Controller } from 'react-hook-form';
import { PiClock, PiEnvelopeSimple } from 'react-icons/pi';
import { Form } from '@ui/form';
import { Loader, Text, Input } from 'rizzui';
import FormGroup from '@/app/shared/form-group';
import FormFooter from '@components/form-footer';
import {
  defaultValues,
  personalInfoFormSchema,
  PersonalInfoFormTypes,
} from '@/validators/personal-info.schema';
import UploadZone from '@ui/file-upload/upload-zone';
import { countries, roles, timezones } from '@/data/forms/my-details';
import AvatarUpload from '@ui/file-upload/avatar-upload';
import { useTranslation } from '@/app/i18n/client';

const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => (
    <div className="grid h-10 place-content-center">
      <Loader variant="spinner" />
    </div>
  ),
});

const QuillEditor = dynamic(() => import('@ui/quill-editor'), {
  ssr: false,
});

export default function PersonalInfoView({ lang }: { lang?: string }) {
  const { t } = useTranslation(lang!, 'form');
  const onSubmit: SubmitHandler<PersonalInfoFormTypes> = (data) => {
    toast.success(<Text as="b">Successfully added!</Text>);
    console.log('Profile settings data ->', {
      ...data,
    });
  };

  return (
    <Form<PersonalInfoFormTypes>
      validationSchema={personalInfoFormSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
        defaultValues,
      }}
    >
      {({ register, control, setValue, getValues, formState: { errors } }) => {
        return (
          <>
            <FormGroup
              title={t('form-personal-info')}
              description={t('form-personal-info-description')}
              className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            />

            <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
              <FormGroup
                title={t('form-name')}
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Input
                  placeholder={t('form-first-name')}
                  {...register('first_name')}
                  error={t(errors.first_name?.message!)}
                  className="flex-grow"
                />
                <Input
                  placeholder={t('form-last-name')}
                  {...register('last_name')}
                  error={t(errors.last_name?.message!)}
                  className="flex-grow"
                />
              </FormGroup>

              <FormGroup
                title={t('form-email-address')}
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Input
                  className="col-span-full"
                  prefix={
                    <PiEnvelopeSimple className="h-6 w-6 text-gray-500" />
                  }
                  type="email"
                  placeholder={t('form-email-address-placeholder')}
                  {...register('email')}
                  error={t(errors.email?.message!)}
                />
              </FormGroup>

              <FormGroup
                title={t('form-your-photo')}
                description={t('form-your-photo-placeholder')}
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <div className="flex flex-col gap-6 @container @3xl:col-span-2">
                  <AvatarUpload
                    name="avatar"
                    setValue={setValue}
                    getValues={getValues}
                    error={t(errors?.avatar?.message as string)}
                  />
                </div>
              </FormGroup>

              <FormGroup
                title={t('form-role')}
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Controller
                  control={control}
                  name="role"
                  render={({ field: { value, onChange } }) => (
                    <Select
                      dropdownClassName="!z-10"
                      inPortal={false}
                      placeholder={t('form-select-role')}
                      options={roles}
                      onChange={onChange}
                      value={value}
                      className="col-span-full"
                      getOptionValue={(option) => option.value}
                      displayValue={(selected) =>
                        roles?.find((r) => r.value === selected)?.label ?? ''
                      }
                      error={t(errors?.role?.message as string)}
                    />
                  )}
                />
              </FormGroup>

              <FormGroup
                title={t('form-country')}
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Controller
                  control={control}
                  name="country"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      dropdownClassName="!z-10"
                      inPortal={false}
                      placeholder={t('form-select-country')}
                      options={countries}
                      onChange={onChange}
                      value={value}
                      className="col-span-full"
                      getOptionValue={(option) => option.value}
                      displayValue={(selected) =>
                        countries?.find((con) => con.value === selected)
                          ?.label ?? ''
                      }
                      error={t(errors?.country?.message as string)}
                    />
                  )}
                />
              </FormGroup>

              <FormGroup
                title={t('form-timezone')}
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Controller
                  control={control}
                  name="timezone"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      dropdownClassName="!z-10"
                      inPortal={false}
                      prefix={<PiClock className="h-6 w-6 text-gray-500" />}
                      placeholder={t('form-select-timezone')}
                      options={timezones}
                      onChange={onChange}
                      value={value}
                      className="col-span-full"
                      getOptionValue={(option) => option.value}
                      displayValue={(selected) =>
                        timezones?.find((tmz) => tmz.value === selected)
                          ?.label ?? ''
                      }
                      error={t(errors?.timezone?.message as string)}
                    />
                  )}
                />
              </FormGroup>

              <FormGroup
                title={t('form-bio')}
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Controller
                  control={control}
                  name="bio"
                  render={({ field: { onChange, value } }) => (
                    <QuillEditor
                      value={value}
                      onChange={onChange}
                      className="@3xl:col-span-2 [&>.ql-container_.ql-editor]:min-h-[100px]"
                      labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                    />
                  )}
                />
              </FormGroup>

              <FormGroup
                title={t('form-portfolio-projects')}
                description={t('form-portfolio-projects-description')}
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <div className="mb-5 @3xl:col-span-2">
                  <UploadZone
                    name="portfolios"
                    getValues={getValues}
                    setValue={setValue}
                    error={t(errors?.portfolios?.message as string)}
                  />
                </div>
              </FormGroup>
            </div>

            <FormFooter
              // isLoading={isLoading}
              altBtnText={t('form-cancel')}
              submitBtnText={t('form-save')}
            />
          </>
        );
      }}
    </Form>
  );
}
