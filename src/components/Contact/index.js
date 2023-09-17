'use client'
import React, { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const formConfig = [
  {
    label: 'First name',
    name: 'firstName',
    type: 'text',
    placeholder: '',
    isTextarea: false,
  },
  {
    label: 'Last name',
    name: 'lastName',
    type: 'text',
    placeholder: '',
    isTextarea: false,
  },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    placeholder: '',
    isTextarea: false,
  },
  {
    label: 'Phone number',
    name: 'phoneNumber',
    type: 'tel',
    placeholder: '',
    isTextarea: false,
  },
  {
    label: 'Message',
    name: 'message',
    type: 'text',
    placeholder: '',
    isTextarea: true,
  },
]
export default function ContactComponent() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
  })
  const { toast } = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }
  const handleSubmitContact = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/contactInfo', {
        method: 'POST',
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          message: formData.message,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        setTimeout(() => {
          toast({
            title: 'Success!',
            description: 'Message Sent Successfully!',
          })
        }, 3000)

        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          message: '',
        })
      } else {
        toast({
          title: 'Error!',
          description: 'Message could not be sent. Please try again.',
        })
      }
    } catch (error) {
      console.log(error)
      toast({
        title: 'Error!',
        description: 'An error occurred. Please try again.',
      })
    }
  }

  return (
    <div className="relative isolate bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
              <svg
                className="absolute inset-0 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                    width={200}
                    height={200}
                    x="100%"
                    y={-1}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M130 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" strokeWidth={0} fill="white" />
                <svg x="100%" y={-1} className="overflow-visible fill-gray-50">
                  <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                </svg>
                <rect
                  width="100%"
                  height="100%"
                  strokeWidth={0}
                  fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Get in touch
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Get in touch with us! We value your feedback and inquiries.
              Contact our dedicated team for prompt assistance. We are here to
              help!
            </p>
            <dl className="mt-10 space-y-4 text-base leading-7 text-gray-600">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Address</span>
                  <Image
                    src="/building.svg"
                    alt="address"
                    width={24}
                    height={200}
                  />
                </dt>
                <dd>
                  19702 Newark,
                  <br />
                  Delaware, USA
                </dd>
              </div>

              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <Image
                    src="/envelop.svg"
                    alt="mail"
                    width={24}
                    height={200}
                  />
                </dt>
                <dd>
                  <a
                    className="hover:text-gray-900"
                    href="mailto:one@vaionex.com"
                  >
                    one@vaionex.com
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <form
          className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48"
          onSubmit={handleSubmitContact}
        >
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              {formConfig.map((field) => (
                <div className="mt-2.5" key={field.name}>
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <div className="mt-2.5">
                    {field.isTextarea ? (
                      <Textarea
                        name={field.name}
                        id={field.name}
                        rows={4}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required={true}
                      />
                    ) : (
                      <Input
                        type={field.type}
                        name={field.name}
                        id={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required={true}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-end">
              <Button type="submit" className=" text-white">
                Send message
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
