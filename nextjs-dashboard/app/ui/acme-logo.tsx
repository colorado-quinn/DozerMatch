import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex md:flex-col leading-none text-white`}
    >
      <WrenchScrewdriverIcon className="h-12 w-12 mr-5" />
      <p className="text-[44px]">Dozer Match</p>
    </div>
  );
}
