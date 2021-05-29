<template>
    <div class="text-yellow-100">
        <div class="flex justify-center">
            <h1 class="text-3xl underline">About the program</h1>
        </div>
        <div class="text-lg flex justify-left m-3">
            <ol>
                <li>
                    The progam stores the address on local mongodb community
                    server under the head of "addressbook".
                </li>
                <li>
                    The program relays on mongodb community server being
                    installed on the local sustem
                </li>
                <li>
                    The progam has the features of:
                    <dl>
                        <li>- Adding new Address.</li>
                        <li>- Printing the lables of address.</li>
                        <li>- Searching for names in the address list</li>
                        <li>- Clicking on the label to update the address.</li>
                        <li>- Updating the address.</li>
                    </dl>
                </li>
                <div></div>
                <li class="text-xl text-red-500">
                    Future Enahancments:
                    <dl class="text-lg text-white">
                        <li>
                            - The Address are each time fetched from mongodb,
                            thus takes some time to get loaded in the Address
                            List page.
                        </li>
                        <li>
                            - The Appliation do not have a decoder embedded in
                            the application, thats due to inherent program bug
                            of navigator.getmedia devices not able ot access the
                            device once built.
                        </li>
                        <li>
                            - Probably i shall make a separate progrma for
                            decoding.
                        </li>
                    </dl>
                </li>
            </ol>
        </div>
    </div>
</template>
