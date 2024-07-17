'use client';

import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Button, Input } from 'rizzui';
import { Form } from '@ui/form';
import {
  NewsLetterFormSchema,
  newsLetterFormSchema,
} from '@/validators/newsletter.schema';
import { useTranslation } from '@/app/i18n/client';

const initialValues = {
  email: '',
};

export default function NewsLetterForm({ lang }: { lang?: string }) {
  const { t } = useTranslation(lang!, 'form');
  const [reset, setReset] = useState({});

  const onSubmit: SubmitHandler<NewsLetterFormSchema> = (data) => {
    console.log(data);
    setReset(initialValues);
  };
  return (
    <>
      <Form<NewsLetterFormSchema>
        validationSchema={newsLetterFormSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="grid grid-cols-1 gap-3">
            <Input
              placeholder={t('form-email-placeholder')}
              inputClassName="w-full text-base"
              size="xl"
              rounded="pill"
              {...register('email')}
              error={errors.email?.message}
            />
            <Button
              type="submit"
              className="w-full text-base font-medium"
              size="xl"
              rounded="pill"
            >
              {t('form-subscribe')}
            </Button>
          </div>
        )}
      </Form>
    </>
  );
}
