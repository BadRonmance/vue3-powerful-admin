const clickoutsideContext = '@@clickoutsideContext',
    onClickOutSide = {
    /*
   @param el 指令所绑定的元素
   @param binding {Object}
   @param vnode vue编译生成的虚拟节点
   */
        beforeMount(el: any, binding: any, vnode: any) {
            const documentHandler = function (e: any) {
            // console.log(el)
            // console.log(e.target);
            // console.log(vnode);
            // console.log(binding);

                if (!vnode.context || el.contains(e.target)) {
                    return false;
                }
                if (binding.expression) {
                    vnode.context[el[clickoutsideContext].methodName](e);
                } else {
                    el[clickoutsideContext].bindingFn(e);
                }
            };

            el[clickoutsideContext] = {
                documentHandler,
                'methodName': binding.expression,
                'bindingFn': binding.value
            };
            setTimeout(() => {
                document.addEventListener('click', documentHandler);
            }, 0);
        },
        update(el: any, binding: any) {
            el[clickoutsideContext].methodName = binding.expression;
            el[clickoutsideContext].bindingFn = binding.value;
        },
        unbind(el: any) {
            document.removeEventListener('click', el[clickoutsideContext].documentHandler);
        }
    };

export default onClickOutSide;