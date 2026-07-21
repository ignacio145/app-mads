import { useMemo, useRef } from "react";
import { Platform } from "react-native";

interface ScrollableNode {
    scrollLeft: number;
    style: CSSStyleDeclaration;
}

// Habilita "click & drag" con mouse en FlatList/ScrollView horizontales en web,
// donde por defecto solo responden a touch, rueda o el scrollbar.
const useDragScroll = () => {
    const listRef = useRef<any>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const startScrollLeft = useRef(0);

    const getNode = (): ScrollableNode | null => {
        const node = listRef.current;
        if (!node) return null;
        return typeof node.getScrollableNode === "function"
            ? node.getScrollableNode()
            : node;
    };

    const style = useMemo(
        () => (Platform.OS === "web" ? { cursor: "grab" as const } : undefined),
        []
    );

    const webHandlers = useMemo(() => {
        if (Platform.OS !== "web") return {};

        return {
            onMouseDown: (e: any) => {
                const node = getNode();
                if (!node) return;
                isDragging.current = true;
                startX.current = e.pageX;
                startScrollLeft.current = node.scrollLeft;
                node.style.cursor = "grabbing";
                node.style.userSelect = "none";
            },
            onMouseMove: (e: any) => {
                if (!isDragging.current) return;
                const node = getNode();
                if (!node) return;
                e.preventDefault?.();
                const walked = e.pageX - startX.current;
                node.scrollLeft = startScrollLeft.current - walked;
            },
            onMouseUp: () => {
                isDragging.current = false;
                const node = getNode();
                if (node) {
                    node.style.cursor = "grab";
                    node.style.removeProperty("user-select");
                }
            },
            onMouseLeave: () => {
                isDragging.current = false;
                const node = getNode();
                if (node) {
                    node.style.cursor = "grab";
                    node.style.removeProperty("user-select");
                }
            },
            onDragStart: (e: any) => e.preventDefault?.(),
        };
    }, []);

    return { listRef, webHandlers, style };
};

export default useDragScroll;
