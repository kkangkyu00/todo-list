import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, AddCard, Leaderboard, Settings } from '@mui/icons-material';
import { classNames } from '@utils';

import { TabWrapper, TabContent } from './style';

const pathMap = [
  { icon: <Home />, path: '/' },
  { icon: <AddCard />, path: '/tasks' },
  { icon: <Leaderboard />, path: '/stat' },
  { icon: <Settings />, path: '/setting' }
];

const tabTextVariant = {
  active: { y: -8 },
  inactive: { y: 0 }
};

const TabContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [variants, setVariants] = useState({});

  useEffect(() => {
    const tick = setTimeout(() => {
      const tabBorder = document.querySelector('.tab-border') as HTMLElement;
      const tabs = document.querySelectorAll('.tab');
      if (!tabs.length || !tabBorder) return;

      const obj: Record<string, unknown> = {};
      pathMap.forEach(({ path }, index) => {
        const offsetActiveItem = tabs[index].getBoundingClientRect();
        const left = Math.floor(offsetActiveItem.left - (tabBorder.offsetWidth - offsetActiveItem.width) / 2);
        obj[path.slice(1)] = {
          transform: `translateX(${left - 15}px)`
        };
      });
      setVariants(obj);
    }, 0);
    return () => clearTimeout(tick);
  }, []);

  const handleClickTab = (path: string) => {
    navigate(path);
  };

  return (
    <TabWrapper>
      <div>
        <TabContent>
          {pathMap.map(({ icon, path }) => (
            <motion.div
              role="presentation"
              className={classNames('tab', { active: location.pathname === path })}
              animate={location.pathname === path ? 'active' : 'inactive'}
              onClick={() => handleClickTab(path)}
            >
              <motion.span variants={tabTextVariant}>{icon}</motion.span>
            </motion.div>
          ))}
        </TabContent>
        <motion.div className="tab-border" animate={location.pathname.slice(1)} variants={variants}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.625 18.625" height="19.867" width="19.867">
            <path d="M0 0v18.625C.459 6.493 7.17.804 18.625 0z" fillRule="evenodd" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.625 18.625" height="19.867" width="19.867">
            <path d="M0 0v18.625C.459 6.493 7.17.804 18.625 0z" fillRule="evenodd" />
          </svg>
        </motion.div>
      </div>
    </TabWrapper>
  );
};

export default TabContainer;
