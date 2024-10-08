import Image from 'next/image';
import * as z from 'zod';
import styles from './quastionsBlock.module.scss';
import { Button, Input } from '@/components/ui';
import { PropsWithChildren } from 'react';
import Textarea from '@/components/ui/textarea/textarea';
import { Body1, Heading2, Heading5 } from '@/components/ui/heading';
import { Container, FieldController, Form } from '@/components/shared';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { QuestoionSchema } from '@/schemas';

interface quastionsBlockProps {
    className?: string;
}

const QuastionsBlock: React.FC<PropsWithChildren<quastionsBlockProps>> = ({
    className,
    children,
}) => {
    const form = useForm<z.infer<typeof QuestoionSchema>>({
        resolver: zodResolver(QuestoionSchema),
        // mode: 'onChange',
        defaultValues: {
            name: '',
            email: '',
            question: '',
        },
    });

    const onSubmit = (values: z.infer<typeof QuestoionSchema>) => {
        console.log('Form Submitted:', values);
    };
    return (
        <section id="faqs" className={styles.quastionsBlock + ' ' + className}>
            <Container className={'max-md:py-[72px] py-24'}>
                <Body1 className=" text-text-secondary">FAQ</Body1>
                <Heading2 className="font-bold max-md:text-[28px] text-[36px] text-text leading-10 max-md:mb-10 mb-12">
                    Всё, что Вы хотели знать
                </Heading2>

                {/* CONTENT */}
                <div className="flex flex-row max-lg:flex-col gap-12 mb-12">
                    <div className="flex flex-col gap-3 w-[65%] max-lg:w-full">{children}</div>

                    <div className="flex flex-col max-lg:mx-auto mt-10 w-[35%] max-lg:w-[50%] max-md:w-full">
                        <div className="p-0">
                            <div className="text-center">
                                <Heading5 className="text-text">
                                    Не нашли ответ на свой вопрос?
                                    <br />
                                    <span className="text-blue-main">Напишите нам!</span>
                                </Heading5>

                                <div className="flex flex-col gap-3 my-4">
                                    <Form onSubmit={form.handleSubmit(onSubmit)} methods={form}>
                                        <FieldController
                                            control={form.control}
                                            name="name"
                                            render={({ field, fieldState }) => (
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    value={field.value || ''}
                                                    onChange={field.onChange}
                                                    intent={fieldState?.error ? 'error' : 'default'}
                                                    label="Введите ФИО"
                                                    errorMessage={fieldState?.error?.message}
                                                />
                                            )}
                                        />
                                        <FieldController
                                            control={form.control}
                                            name="email"
                                            render={({ field, fieldState }) => (
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={field.value || ''}
                                                    onChange={field.onChange}
                                                    intent={fieldState?.error ? 'error' : 'default'}
                                                    label="Введите ваш e-mail"
                                                    errorMessage={fieldState?.error?.message}
                                                />
                                            )}
                                        />
                                        <FieldController
                                            control={form.control}
                                            name="question"
                                            render={({ field, fieldState }) => (
                                                <Textarea
                                                    id="question"
                                                    value={field.value || ''}
                                                    onChange={field.onChange}
                                                    intent={fieldState?.error ? 'error' : 'default'}
                                                    textareaSize="medium"
                                                    label="Напишите свой вопрос"
                                                    // placeholder="example@add.com"
                                                    errorMessage={fieldState?.error?.message}
                                                />
                                            )}
                                        />

                                        {/* <Input
                                            id="Name"
                                            type="text"
                                            intent="default"
                                            label="Введите ФИО"
                                        />
                                        <Input
                                            id="email"
                                            type="email"
                                            intent="default"
                                            label="Введите ваш e-mail"
                                        /> */}
                                        {/* <Textarea
                                            id="question"
                                            label="Введите текст"
                                            intent="default"
                                            textareaSize="medium"
                                            className=""
                                        /> */}
                                        <Button intent="primary" size="medium" buttonType="submit">
                                            Отправить
                                        </Button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default QuastionsBlock;
