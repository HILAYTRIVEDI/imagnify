import Header from '@/components/shared/Header'
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const AddTransformationTypePage = async ({params}:SearchParamProps) => {

  const { type } = await params;

  if (!Object.keys(transformationTypes).includes(type)) {
    throw new Error(`Invalid transformation type: ${type}`);
  }

  const transformation = transformationTypes[type as keyof typeof transformationTypes];
  const { userId } = await auth();
  
  if (!userId) redirect('/sign-in');

  const user = await getUserById(userId);
  
  return (
    <>
      <Header
        title={`Add ${transformation.title} Transformation`}
        subtitle={transformation.subTitle}
      />
      <section
        className='mt-10'
      >
        <TransformationForm
          action='Add'
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  )
}

export default AddTransformationTypePage