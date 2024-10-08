import styles from './premiumBlock.module.scss';
import { Button } from '@/components/ui';
import { Container } from '@/components/shared/container';
import Image from 'next/image';
import { Body1, Heading2 } from '@/components/ui/heading';

interface Props {
    className?: string;
}

const PremiumBlock: React.FC<Props> = () => {
    return (
        <section id="premium" className="w-full h-fit bg-white text-white max-md:px-4 px-10">
            <Container className={'pt-24 pb-[12px]'}>
                <div className="relative overflow-hidden flex justify-center w-full min-h-24 rounded-2xl bg-blue-main">
                    <div className="flex flex-col items-center justify-center text-center px-10 py-10 max-w-[900px] z-1">
                        <div className="flex max-md:flex-col flex-row items-center justify-center mb-2">
                            <Image
                                className="object-cover h-fit"
                                width={70}
                                height={65}
                                src={'/star.png'}
                                alt=""
                            />
                            <Heading2 className="max-sm:text-[28px]">
                                Попробуйте Premium версию
                            </Heading2>
                        </div>
                        <Body1 className="text-white-secondary max-md:text-md mb-8">
                            С премиум версией вы получите&nbsp;
                            <span className="text-white font-bold">
                                полный доступ ко всем видам объектов
                            </span>
                            , расширяя возможности управления и анализа.
                        </Body1>
                        <Button
                            intent="primary"
                            // size="full"
                        >
                            Попробовать Premium
                        </Button>
                    </div>
                    {/* SHADOWS */}
                    <div className="absolute top-[-317px] left-[-443px] w-[860px] h-[746px] max-md:left-[-500px] bg-blue-gradient z-0"></div>
                    <div className="absolute bottom-[-300px] right-[-80%] w-[860px] h-[746px] max-sm:right-[-100%] bg-blue-gradient z-0"></div>
                </div>
            </Container>
        </section>
    );
};

export default PremiumBlock;
