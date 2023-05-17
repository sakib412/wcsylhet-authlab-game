class Button{

    title = '';
    className = '';
    action = null;
    bgColor = null;
    color = null;
    left = null
    right = null
    constructor(title,className, action, bgColor, color, right,left){


        this.title = title
        this.className = className
        this.action = action
        this.bgColor = bgColor
        this.color = color
        this.left = left
        this.right = right
    }
    init (){

        button = createButton(this.title);
        button.addClass(this.className);
        button.center();
        button.style('padding', '16px 32px');
        button.style('borderRadius', '5px');
        button.style('border', 'none');
        button.style('top', 'auto');
        button.style('bottom', '25%');


        button.style('left',this.left);

        if(this.right != null){

            console.log(this.right+'----stest')
            button.style('right', this.right);
        }

        console.log(this.left+'----stest')

        button.style('marginRight', '-110px');
        button.style('cursor', 'pointer');
        button.style('backgroundColor', this.bgColor);
        button.style('color', this.color);
        button.style('cursor', 'pointer');

        const action = this.action;
        button.mousePressed(function (){

            if(action!= null){
                action()
            }
        })
    }
}