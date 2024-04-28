import React from "react";
import { Pagination, PaginationItemType, cn } from "@nextui-org/react";

interface PaginatorProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginatorComponent: React.FC<PaginatorProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}: PaginatorProps) => {

    const renderItem = ({
        ref,
        key,
        value,
        isActive,
        onNext,
        onPrevious,
        setPage,
        className,
    }: any) => {

        if (value === PaginationItemType.NEXT) {
            return (
                <button
                    key={key}
                    className={cn(className, "bg-default-200/50 min-w-8 w-8 h-8")}
                    onClick={onNext}
                    disabled={currentPage === totalPages}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                        />
                    </svg>
                </button>
            );
        }

        if (value === PaginationItemType.PREV) {
            return (
                <button
                    key={key}
                    className={cn(className, "bg-default-200/50 min-w-8 w-8 h-8")}
                    onClick={onPrevious}
                    disabled={currentPage === 1}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                        />
                    </svg>
                </button>
            );
        }

        if (value === PaginationItemType.DOTS) {
            return <button key={key} className={className}>...</button>;
        }

        return (
            <button
                ref={ref}
                key={key}
                className={cn(
                    className,
                    isActive &&
                    "text-white bg-gradient-to-br from-secondary to-primary font-bold"
                )}
                onClick={() => setPage(value)}
            >
                {value}
            </button>
        );
    };

    return (
        <Pagination
            disableCursorAnimation
            showControls
            total={totalPages}
            initialPage={currentPage}
            className="gap-2 py-12 flex items-center justify-start md:justify-center"
            radius="full"
            renderItem={renderItem}
            variant="light"
            onChange={(page: number) => onPageChange(page)}
        />
        // <Pagination total={40} initialPage={1} />

    );
};

export default PaginatorComponent;
