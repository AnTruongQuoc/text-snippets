import React from 'react';

// Styles import
import 'styles/pages/dashboard.scss';

// Components import
import SideBar from 'components/sidebar/SideBar';
import Tooltip from 'components/tooltip/Tooltip';
import ContentBlock from 'components/dashboard/ContentBlock';

type TextSnippet = {
    id: number;
    title: string;
    blocks: Array<{ id: number, content: string }>;
}

const mockData: Array<TextSnippet> = [
    {
        id: 1,
        title: 'Getting Started',
        blocks: [
            {
                id: 0,
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            }
        ],
    },
    {
        id: 2,
        title: 'An\'s Notes',
        blocks: [
            {
                id: 0,
                content: 'Helloooooooo'
            },
            {
                id: 0,
                content: 'Helloooooooo'
            }
        ],
    },
]

const Dashboard: React.FC = () => {

    // States
    const titleHeaderRef = React.useRef<HTMLDivElement>(null);
    const [isCloseSideBar, setIsCloseSideBar] = React.useState<boolean>(false);
    const [headerHeight, setHeaderHeight] = React.useState<number>(0);

    const [currentTextSnippet, setCurrentTextSnippet] = React.useState<TextSnippet>({
        id: 0,
        blocks: [],
        title: '',
    });

    // Effects get header height
    React.useLayoutEffect(() => {
        if (titleHeaderRef.current) {
            setHeaderHeight(titleHeaderRef.current.clientHeight);
        }
    }, [titleHeaderRef]);

    const handleCloseSideBar = () => {
        setIsCloseSideBar(true);
    }

    const handleOpenSideBar = () => {
        setIsCloseSideBar(false);
    }

    const handleSelectTextSnippet = (index: number) => {
        setCurrentTextSnippet(mockData[index]);
    }

    return (
        <div className='w-screen h-screen flex flex-row overflow-hidden'>
            <SideBar
                isCloseSideBar={isCloseSideBar}
                handleCloseSideBar={handleCloseSideBar}
                textSnippetsData={mockData}
                handleSelectTextSnippet={handleSelectTextSnippet}
            />

            {/* Main Section */}
            <div className='h-screen w-full max-h-screen'>
                <div
                    ref={titleHeaderRef}
                    className={`mainsection-header flex flex-row items-center pt-3 pb-3 pl-8 pr-4`}
                >
                    {
                        isCloseSideBar &&
                        <button onClick={handleOpenSideBar}
                            className='hover:bg-gray-300 p-1 rounded mr-4'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    }

                    <Tooltip content={currentTextSnippet.title} direction='bottom' >
                        <span className='w-96 text-ellipsis font-medium overflow-hidden whitespace-nowrap'>
                            {currentTextSnippet.title}
                        </span>
                    </Tooltip>
                </div>

                <div className={`mainsection-content max-h-[calc(100vh_-_${headerHeight + 'px'})] pb-5 flex flex-col items-center justify-start  overflow-x-hidden overflow-y-auto dashboard-scrollbar`}>
                    <div className='w-1/2'>
                        <div className='text-4xl font-bold pt-10 pb-5'>{currentTextSnippet.title}</div>
                        <div className='w-full'>
                            <ContentBlock
                                blocks={currentTextSnippet.blocks}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;

