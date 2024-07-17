import { useState } from 'react';
import { PiLockSimple } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import {
  usePatternFormat,
  Text,
  Title,
  Input,
  Button,
  NumberInput,
  NumberInputProps,
} from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { Form } from '@ui/form';
import {
  creditCardSchema,
  CreditCardSchema,
} from '@/validators/credit-card.schema';
import { useTranslation } from '@/app/i18n/client';

type CardExpiryType = NumberInputProps & {
  isMask?: boolean;
};

export default function AddBillingCardModalView({ lang }: { lang?: string }) {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation(lang!, 'form');

  const onSubmit: SubmitHandler<CreditCardSchema> = (data) => {
    // set timeout ony required to display loading state of the create product button
    setLoading(true);
    closeModal();
    setTimeout(() => {
      setLoading(false);
      setReset({
        cardHolder: '',
      });
    }, 600);
  };

  return (
    <div className="m-auto p-6">
      <Title as="h3" className="mb-6 text-lg">
      {t('form-add-new-card')}
      </Title>
      <Form<CreditCardSchema>
        validationSchema={creditCardSchema}
        resetValues={reset}
        onSubmit={onSubmit}
      >
        {({ register, control, formState: { errors } }) => (
          <>
            <BillingForm
              control={control}
              register={register}
              errors={errors}
            />
            <Text
              as="span"
              className="mt-5 flex items-center gap-1 text-sm text-gray-500"
            >
              <PiLockSimple className="h-5 w-5 text-gray-700" />
              {t('text-transaction-secured')}
            </Text>
            <div className="mt-8 flex justify-end gap-3">
              <Button
                className="w-auto"
                variant="outline"
                onClick={() => closeModal()}
              >
                {t('form-cancel')}
              </Button>
              <Button
                type="submit"
                className="w-auto dark:bg-gray-100 dark:text-white"
              >
                {t('form-add')}
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
}

export function BillingForm({ register, control, errors, lang }: any) {
  const { t } = useTranslation(lang!, 'form');
  function CardExpiry({ isMask = false, ...props }: CardExpiryType) {
    const { format } = usePatternFormat({
      ...props,
      format: '##/##',
    });
    const _format = (val: string) => {
      let month = val.substring(0, 2);
      const year = val.substring(2, 4);

      if (month.length === 1 && parseInt(month[0]) > 1) {
        month = `0${month[0]}`;
      } else if (month.length === 2) {
        if (Number(month) === 0) {
          month = '01';
        } else if (Number(month) > 12) {
          month = '12';
        }
      }
      return isMask ? format(`${month}${year}`) : `${month}/${year}`;
    };
    return <NumberInput {...props} format={_format} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Input
        type="text"
        label={t('form-card-holder')}
        placeholder={t('form-form-placeholder')}
        labelClassName="text-sm font-medium text-gray-900"
        {...register('cardHolder')}
        error={t(errors?.cardHolder?.message!)}
      />
      <Controller
        name="cardNumber"
        control={control}
        render={({ field: { onChange, value } }) => (
          <NumberInput
            formatType="pattern"
            format="#### #### #### ####"
            value={value}
            mask="_"
            customInput={Input as React.ComponentType<unknown>}
            onChange={onChange}
            {...{
              label: `${t('form-card-number')}`,
              variant: 'outline',
              labelClassName: 'text-sm font-medium text-gray-900',
              error: t(errors?.cardNumber?.message!),
            }}
          />
        )}
      />
      <div className="grid grid-cols-2 gap-2">
        <Controller
          name="expiryDate"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CardExpiry
              isMask
              formatType="custom"
              placeholder="MM/YY"
              mask={['M', 'M', 'Y', 'Y']}
              allowEmptyFormatting
              customInput={Input as React.ComponentType<unknown>}
              onChange={onChange}
              {...{
                label: `${t('form-expiry-date')}`,
                variant: 'outline',
                labelClassName: 'text-sm font-medium text-gray-900',
                error: t(errors?.expiryDate?.message!),
              }}
            />
          )}
        />
        <Controller
          name="cvc"
          control={control}
          render={({ field: { onChange, value } }) => (
            <NumberInput
              formatType="pattern"
              format="###"
              mask={['C', 'V', 'C']}
              allowEmptyFormatting
              customInput={Input as React.ComponentType<unknown>}
              onChange={onChange}
              value={value}
              {...{
                label: `${t('form-cvc')}`,
                variant: 'outline',
                labelClassName: 'text-sm font-medium text-gray-900',
                error: t(errors?.cvc?.message!),
              }}
            />
          )}
        />
      </div>
    </div>
  );
}
