import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { Home, EditCalendar, Leaderboard, Settings } from '@mui/icons-material';
import { classNames } from '@utils';

import { TabWrapper, TabContent } from './style';

const pathMap = [
  { icon: <Home />, path: '/' },
  { icon: <EditCalendar />, path: '/tasks' },
  { icon: <Leaderboard />, path: '/stat' },
  { icon: <Settings />, path: '/setting' }
];

const tabIconVariant = {
  active: { y: -8 },
  inactive: { y: 0 }
};

const initialVariants = { hiddenState: { display: 'none', transition: { duration: 0 } } };

const TabBarContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [variants, setVariants] = useState<Variants>(initialVariants);

  useEffect(() => {
    const tick = setTimeout(() => {
      const tabBorder = document.querySelector('.tab-border') as HTMLElement;
      const tabs = document.querySelectorAll('.tab');
      if (!tabs.length || !tabBorder) return;

      const obj: Variants = {};
      pathMap.forEach(({ path }, index) => {
        const offsetActiveItem = tabs[index].getBoundingClientRect();
        const left = Math.floor(offsetActiveItem.left - (tabBorder.offsetWidth - offsetActiveItem.width) / 2);
        obj[path.slice(1)] = {
          transform: `translateX(${left - 15.2}px)`
        };
      });
      setVariants((prevState) => ({ ...obj, ...prevState }));
    }, 0);
    return () => clearTimeout(tick);
  }, []);

  const handleClickTab = (path: string) => {
    navigate(path);
  };

  const animateKey = useMemo(() => {
    const isPath = pathMap.filter(({ path }) => location.pathname === path)[0];
    return isPath ? location.pathname.slice(1) : 'hiddenState';
  }, [location]);

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
              <motion.span variants={tabIconVariant}>{icon}</motion.span>
            </motion.div>
          ))}
        </TabContent>
        <motion.div className="tab-border" animate={animateKey} variants={variants}>
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

export default TabBarContainer;
