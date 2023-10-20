'use client'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useFirebaseAuth } from '@/firebase/auth'
import {
  getSubscriptionByProductId,
  cancelSubscription,
} from '@/utils/stripe/index'
export default function CancelPlanModal({ open, setOpen }) {
  const closeModal = () => setOpen(false)
  const { authUser } = useFirebaseAuth()

  const cancelMemberShip = async () => {
    const allSubscriptionsOfPlan = await getSubscriptionByProductId(
      authUser?.uid,
      authUser?.userSubscription?.product?.stripe_metadata_current_plan,
    )
    const activeSubscription = allSubscriptionsOfPlan?.find(
      (s) => s?.status === 'active',
    )
    console.log('allSubscription', activeSubscription)
    cancelSubscription(activeSubscription?.id)
    setOpen(false)
    window.location = '/'
  }

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full  items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative top-[80px] transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div className="flex justify-center flex-col text-center ">
                    <div className="flex justify-center pb-4"></div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Cancel Membership
                    </h2>
                    <p className="text-gray-600 text-sm font-normal">
                      {`You have days left on your Membership. You can continue
                                            to enjoy all premium Legaliser features until `}
                    </p>
                    <p className="text-sm font-normal text-[#F04438]">
                      This process cannot be undone
                    </p>
                    <button
                      onClick={cancelMemberShip}
                      className="bg-[#F04438] text-white text-base font-semibold rounded-md p-2 mt-8 mb-2.5"
                    >
                      Cancel Membership
                    </button>
                    <button
                      className="border border-gray-300 text-base font-semibold text-gray-700 rounded-md p-2 border-solid"
                      onClick={closeModal}
                    >
                      Stay Subscribed
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
