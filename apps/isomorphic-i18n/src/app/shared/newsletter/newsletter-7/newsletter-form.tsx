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

export default function NewsLetterForm({
  className,
  lang,
}: {
  className?: string;
  lang?: string;
}) {
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
          <div className="mx-auto max-w-lg">
            <Input
              placeholder={t('form-email-placeholder')}
              inputClassName="w-full text-base pr-36"
              size="xl"
              {...register('email')}
              error={errors.email?.message}
            />
            <Button
              type="submit"
              className="mt-3 w-full text-base font-medium"
              size="xl"
            >
              {t('form-subscribe')}
            </Button>
          </div>
        )}
      </Form>
    </>
  );
}
