import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faS, faGlobe } from '@fortawesome/free-solid-svg-icons';

export default function TopHeader(): JSX.Element {
  return (
    <div className='w-full mx-auto max-w-10xl p-4 sm:p-6 lg:p-12 max-h-24'>
      <div className='flex flex-row w-full items-center justify-between'>
        <span className='font-bold flex flex-1 flex-row items-center justify-start'>
          <span className='w-6 h-6'>
            <FontAwesomeIcon icon={faGlobe} />
          </span>
          &nbsp;&nbsp;EN
        </span>
        <span className='font-bold'>
          <a href='#'>Help</a>
          &nbsp;&nbsp;&nbsp;
          <a href='#'>Login</a>
        </span>
      </div>
    </div>
  );
}
