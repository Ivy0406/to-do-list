const TodoTabs = ({currentTab, onTabChange}) => {
    const tabs = [
        {id: "all", label: "全部"},
        {id: "pending", label: "待完成"},
        {id: "done", label: "已完成"}
    ];

    return ( 
    <div className="flex h-12.75">
        {tabs.map(tab => (
            <button
                key={tab.id}
                  value={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex-1 font-bold  cursor-pointer text-[14px] ${currentTab === tab.id ? "text-text-main border-b-2 border-text-main" : " font-bold text-text-sub border-b-2 border-[#EFEFEF]"}`}
                >
                  {tab.label}
            </button>)
            )}
               
     </div> );
};
 
export default TodoTabs;