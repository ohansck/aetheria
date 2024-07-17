'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Controller, SubmitHandler } from 'react-hook-form';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { Input, Text, Title, Button, Select } from 'rizzui';
import { Form } from '@ui/form';
import {
  AddTeamMemberInput,
  addTeamMemberSchema,
} from '@/validators/team-member.schema';
import { useTranslation } from '@/app/i18n/client';

const role = [
  {
    label: 'Product Designer',
    value: 'product_designer',
  },
  {
    label: 'Software Engineer',
    value: 'software_engineer',
  },
];

const countries = [
  {
    label: 'United States',
    value: 'usa',
  },
  {
    label: 'Bangladesh',
    value: 'bd',
  },
];

const teams = [
  {
    label: 'Design',
    value: 'design',
  },
  {
    label: 'Human Resource',
    value: 'human_resource',
  },
  {
    label: 'Operations',
    value: 'operations',
  },
  {
    label: 'Finance',
    value: 'finance',
  },
  {
    label: 'Product',
    value: 'product',
  },
];

export default function AddTeamMemberModalView({ lang }: { lang?: string }) {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation(lang!, 'form');

  const onSubmit: SubmitHandler<AddTeamMemberInput> = (data) => {
    toast.success(
      <Text as="b" className="font-semibold">
        {t('table-team-member-add-successfully')}
      </Text>
    );
    // set timeout ony required to display loading state of the create product button
    setLoading(true);
    closeModal();
    setTimeout(() => {
      setLoading(false);
      setReset({
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        country: '',
      });
    }, 600);
  };

  return (
    <div className="m-auto p-6">
      <Title as="h3" className="mb-6 text-lg">
      {t('form-add-new-member')}
      </Title>
      <Form<AddTeamMemberInput>
        validationSchema={addTeamMemberSchema}
        resetValues={reset}
        onSubmit={onSubmit}
      >
        {({ register, control, formState: { errors } }) => (
          <>
            <MemberForm control={control} register={register} errors={errors} />
            <div className="mt-8 flex justify-end gap-3">
              <Button
                className="w-auto"
                variant="outline"
                onClick={() => closeModal()}
              >
                {t('form-cancel')}
              </Button>
              <Button type="submit" isLoading={isLoading} className="w-auto">
              {t('form-add-member')}
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
}

export function MemberForm({ register, control, errors, lang }: any) {
  const { t } = useTranslation(lang!, 'form');

  return (
    <div className="flex flex-col gap-4 text-gray-700">
      <div className="flex flex-col gap-4 xs:flex-row xs:items-center">
        <Input
          type="text"
          label={t('form-first-name')}
          placeholder={t('form-first-name-placeholder')}
          labelClassName="text-sm font-medium text-gray-900"
          {...register('first_name')}
          error={t(errors?.first_name?.message!)}
          className="flex-grow"
        />
        <Input
          type="text"
          label={t('form-last-name')}
          placeholder={t('form-last-name-placeholder')}
          labelClassName="text-sm font-medium text-gray-900"
          {...register('last_name')}
          error={t(errors?.last_name?.message!)}
          className="flex-grow"
        />
      </div>
      <Input
        type="email"
        label={t('form-email')}
        labelClassName="text-sm font-medium text-gray-900"
        placeholder={t('form-email-placeholder')}
        {...register('email')}
        error={t(errors.email?.message!)}
      />
      <Controller
        control={control}
        name="role"
        render={({ field: { value, onChange } }) => (
          <Select
          label={t('form-role')}
            inPortal={false}
            labelClassName="text-sm font-medium text-gray-900"
            // @ts-ignore
            placeholder={role[0].name}
            options={role}
            onChange={onChange}
            value={value}
            getOptionValue={(option) => option.value}
            displayValue={(selected) =>
              role?.find((r) => r.value === selected)?.label ?? ''
            }
            error={t(errors?.role?.message as string)}
          />
        )}
      />
      <Controller
        control={control}
        name="country"
        render={({ field: { onChange, value } }) => (
          <Select
          label={t('form-country')}
            inPortal={false}
            labelClassName="text-sm font-medium text-gray-900"
            // @ts-ignore
            placeholder={countries[0].name}
            options={countries}
            onChange={onChange}
            value={value}
            getOptionValue={(option) => option.value}
            displayValue={(selected) =>
              countries?.find((con) => con.value === selected)?.label ?? ''
            }
            error={t(errors?.country?.message as string)}
          />
        )}
      />
      <Controller
        control={control}
        name="teams"
        render={({ field: { value, onChange } }) => (
          <Select
          label={t('form-assign-to-team')}
            labelClassName="text-sm font-medium text-gray-900"
            placeholder={t('form-select-team')}
            inPortal={false}
            options={teams}
            onChange={onChange}
            value={value}
            getOptionValue={(option) => option.value}
            displayValue={(selected) =>
              teams?.find((t) => t.value === selected)?.label ?? ''
            }
            error={t(errors?.teams?.message as string)}
          />
        )}
      />
    </div>
  );
}
