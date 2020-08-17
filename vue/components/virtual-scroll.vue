<template>
    <!--          v-debounce="{ event: 'scroll', handler: handleScroll, wait: 50 }"-->
    <!--        @scroll.passive="handleScroll"-->
    <div class="dynamicScroller" ref="scroller" @scroll.passive="handleScroll">
        <slot name="before"></slot>
        <div  ref="phantom" class="phantom" :style="tableSize"></div>
        <div class="wrapper" ref="wrapper">
            <div
                class="item-view"
                :class="direction"
                v-for="view of pool"
                :key="view.id"
                v-show="view.used"
                :style="{
                    transform: `translate${direction === 'vertical' ? 'Y' : 'X'}(${
                        view.position
                    }px)`,
                }"
            >
                <slot :size="view.item" :index="view.index"></slot>
            </div>
        </div>
        <slot name="before"></slot>
    </div>
</template>
<script>
import * as scroll from 'src/utils/scroll.ts';
import * as math from 'src/utils/math.ts';
let uid = 0;
export default {
    name: 'dynamicScroller',
    props: {
        items: {
            type: Array,
            require:true
        },
        direction: {
            type: String,
            default: 'vertical',
            validator: (value) => ['vertical', 'horizontal'].includes(value),
        },
    },
    components: {},
    data() {
        return {
            pool: [],
            visibleIndex: {
                start: -1,
                end: -1,
            },
        };
    },
    methods: {
        usedView(viewIndex, itemsIndex) {
            let view = {}, { items, itemsPosition } = this;
            if(this.pool[viewIndex]){
                view = this.pool[viewIndex]
                view.item = items[itemsIndex];
                view.index = itemsIndex;
                view.used = true;
                view.position = itemsPosition[itemsIndex-1]||0;
            }else{
                 view = {
                    item:this.items[itemsIndex],
                    position:itemsPosition[itemsIndex-1]||0,
                    index: itemsIndex,
                    id: uid++,
                    used: true,
                };
                this.pool.push(view);
            }
            return view
        },
        unusedView(view) {
            view.item = undefined;
            view.used = false;
            view.position = -9999;
            view.index = -1;
        },
        updateVisibleItems() {
            let { start, end } = this.visibleIndex;
            let items = this.items;
            let viewIndex = 0;
            //更新使用的view
            for (let i = start; i <= end; i++) {
                this.usedView(viewIndex,i)
                viewIndex++
            }
            // 处理不使用的view
            for (let i = viewIndex; i < this.pool.length; i++) {
                this.unusedView(this.pool[i]);
            }

        },
        handleScroll() {
            if (this.direction === 'vertical') {
                this.handleVisibilityChange( this.$refs.scroller.scrollTop, this.$refs.scroller.clientHeight);
            }else{
                this.handleVisibilityChange( this.$refs.scroller.scrollLeft, this.$refs.scroller.clientWidth);
            }
        },
        handleVisibilityChange(offset,clientSize) {
            let { start, end } = scroll.findVisibleIndex(
                offset,
                clientSize,
                this.itemsPosition,
            );
            this.visibleIndex.start = start;
            this.visibleIndex.end = end;
        },
    },
    watch: {
        visibleIndex: {
            deep: true,
            handler() {
                this.updateVisibleItems();
            },
        },
        items: {
            deep: true,
            handler() {
                this.handleScroll();
            },
        },
    },
    computed: {
        tableSize() {
            if (this.direction === 'vertical') {
                return {
                    height: `${math.total(this.items, 0, -1)}px`,
                    width: '100%',
                };
            }else{
                return {
                    height:'100%',
                    width:`${math.total(this.items, 0, -1)}px`,
                };
            }

        },
        //尺寸缓存
        itemsPosition() {
            let total = 0;
            return this.items.map((item) => {
                total += item;
                return total;
            });
        },
    },
    mounted() {
        this.handleScroll();
    },
};
</script>

<style lang="stylus" scoped>
.dynamicScroller
    overflow auto
    position absolute
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .phantom
        position absolute
    .item-view
        will-change: transform;
        position: absolute;
        top: 0;
        left: 0;

</style>
